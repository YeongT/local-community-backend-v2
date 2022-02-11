import { Request, Response, Router } from 'express';
import { DBError } from '../../server/app';
import respond from '../coms/respondClient';
import { configErrors, ERR_DB, ERR_NOT_AUTH, ERR_SYS } from '../coms/errorMessage';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  //CHECK DB STATUS
  if (DBError !== null) return respond(res, ERR_DB.code, ERR_DB.msg, null, DBError);

  //VALID AUTHORIZATION
  const authKey = process.env.REGISTER_BASIC_AUTH_KEY;
  if (authKey === undefined) return respond(res, ERR_SYS.code, ERR_SYS.msg, null, configErrors['HTTP-BASIC']);
  if (req.headers.authorization !== `Basic ${authKey}`)
    return respond(res, ERR_NOT_AUTH.code, ERR_NOT_AUTH.msg, null, null);

  //CHECK PARAMETERS
  //TODO : Check Parameter format using regex or other library

  respond(res, 200, 'SERVICE_IS_RUNNING', null, null);
});
export default router;
