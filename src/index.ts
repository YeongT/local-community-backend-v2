import { Request, Response, Router } from 'express';
import { DBError } from '../server/app';
import { emailCheckAPI } from './auth/emailCheck';
import registerAPI from './auth/register';
import loginAPI from './auth/login';
import { configErrors } from './coms/errorMessage';

const router = Router();

interface statusCheck {
  name: string;
  error: string | null;
}

router.get('/', (req: Request, res: Response) => {
  const DB_STATUS =
    DBError === null ? `<a class="statusOkay">Connected</a>` : `<a class="statusError">${DBError}</a> `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<title>Local-Community API Server</title>');
  res.write('<link rel="icon" href="https://www.loadover.me/common/icon.png">');
  res.write('<link rel="stylesheet" href="https://www.loadover.me/common/styles/apiMain.css">');
  res.write('Welcome!<br>This is API Server of Local-Community<br><br>');
  res.end(`Database Connection : ${DB_STATUS}`);
});

router.get('/status', (req: Request, res: Response) => {
  // eslint-disable-next-line prefer-const
  let errors: Array<statusCheck> = new Array<statusCheck>(),
    errorCount = 0;
  errors.push({ name: 'Database-Connection', error: DBError });
  errors.push({
    name: 'Register-Basic-Auth-Key',
    error: process.env.REGISTER_BASIC_AUTH_KEY ? null : configErrors['HTTP-BASIC'],
  });
  errors.push({
    name: 'Login-Basic-Auth-Key',
    error: process.env.LOGIN_BASIC_AUTH_KEY ? null : configErrors['HTTP-BASIC'],
  });
  errors.push({
    name: 'JWT-Token-Secret-Key',
    error: process.env.JWT_TOKEN_SECRETKEY ? null : configErrors['JWT-SECRET'],
  });
  errors.forEach((errorObject, inx, array) => {
    if (errorObject.error !== null) errorCount++;
  });
  res.status(errorCount === 0 ? 200 : 500).json(errors);
});

router.use('/auth/emailCheck', emailCheckAPI);
router.use('/auth/register', registerAPI);
router.use('/auth/login', loginAPI);

export default router;
