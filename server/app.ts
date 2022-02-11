import * as path from 'path';
import { renderFile } from 'ejs';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { json, urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { statSync } from 'fs';
import { config } from 'dotenv';
import { connect, connection } from 'mongoose';

import router from '../src/index';

const app = express();
let DBError: string | null = 'WAIT_DB_CONNECTION',
  DBAttempt = 0;

//OPEN LOCAL ENV FILE WHEN NOT RUNNING IN CI/CD
if (!process.env.RUN_IN_CI_CD) {
  statSync(path.join(__dirname, '../env/.env'));
  config({ path: path.join(__dirname, '../env/.env') });
}

//OPEN SWAGGER_UI DOCS
statSync(path.join(__dirname, '../src/swagger.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(YAML.load(path.join(__dirname, '../src/swagger.yaml'))));

app.use(cors());
app.use(cookieParser());
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: false }));

app.use('/', router);
app.engine('html', (path) => {
  void renderFile(path);
});

const connectInfo = {
  id: process.env.DB_USER_ID || '',
  pw: process.env.DB_USER_PW || '',
  host: process.env.DB_HOST || '',
  name: process.env.DB_NAME || '',
};
//#DATABASE CONNECT FUNCTION
const DBConnect = (): void => {
  connect(
    `mongodb+srv://${connectInfo.id}:${connectInfo.pw}@${connectInfo.host}/${connectInfo.name}?authSource=admin&retryWrites=true&w=majority&ssl=true`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
    .then(() => {
      DBAttempt = 0;
      DBError = null;
      console.log(`[DB] Database connected using SSL`);
    })
    .catch((reason: any) => {
      DBError = String(reason);
      console.log(DBError);
    });
};

connection.on('disconnected', () => {
  console.log(`\n[DB] Database disconnected. Trying to reconnect... (${DBAttempt++})`);
  DBError = 'disconnected';
  setTimeout(DBConnect, 1000);
});

DBConnect();
export { app, DBError };
