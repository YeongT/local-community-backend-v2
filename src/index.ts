import { Request, Response, Router } from 'express';
import { DBError } from '../server/app';
import registerAPI from './auth/register';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const DB_STATUS =
    DBError === null ? `<a class="statusOkay">Connected</a>` : `<a class="statusError">${DBError}</a> `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<title>Project-Backend API Server</title>');
  res.write('<link rel="icon" href="https://www.loadover.me/common/icon.png">');
  res.write('<link rel="stylesheet" href="https://www.loadover.me/common/styles/apiMain.css">');
  res.write('Welcome!<br>This is API Server of Project-Backend<br><br>');
  res.end(`Database Connection : ${DB_STATUS}`);
});

router.use('/auth/register', registerAPI);

export default router;
