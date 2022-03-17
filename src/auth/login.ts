import { Request, Response, Router } from 'express';
import { pbkdf2Sync } from 'crypto';
import { DBError } from '../../server/app';
import { respond } from '../coms/respondClient';
import { validatorErrorChecker, validators } from '../coms/validator';
import { configErrors, ERR_DB, ERR_NOT_AUTH, ERR_LOGIN_FAILED, ERR_SYS } from '../coms/errorMessage';
import jwtSign from '../jwtauth/jwtSign';

import { UserModel, UserObject } from '../../models/user';
const router = Router();

router.post('/', validators.email, validators.password, async (req: Request, res: Response) => {
  //# CHECK DB STATUS
  if (DBError !== null) return respond(res, ERR_DB.code, ERR_DB.msg, null, DBError);

  //# AUTHORIZATION
  const authKey = process.env.LOGIN_BASIC_AUTH_KEY;
  if (authKey === undefined) return respond(res, ERR_SYS.code, ERR_SYS.msg, null, configErrors['HTTP-BASIC']);
  if (req.headers.authorization !== `Basic ${authKey}`)
    return respond(res, ERR_NOT_AUTH.code, ERR_NOT_AUTH.msg, null, null);

  //# CHECK PARAMETER ERROR
  if (!validatorErrorChecker(req, res)) return;

  //# GET USER OBJECT USING EMAIL AND AUTH USER PASSWORD
  const _user: UserObject | null = await UserModel.findOne({ 'account.email': `${req.body.email}` });
  if (_user === null) return respond(res, ERR_LOGIN_FAILED.code, ERR_LOGIN_FAILED.msg, null, null);
  if (
    _user.auth.password !==
    pbkdf2Sync(req.body.password, _user.auth.salt, 100000, 64, 'SHA512').toString('base64')
  )
    return respond(res, ERR_LOGIN_FAILED.code, ERR_LOGIN_FAILED.msg, null, null);

  //# GENERATE NEW USER JWT TOKEN
  const secretKey = process.env.JWT_TOKEN_SECRETKEY;
  if (secretKey === undefined)
    return respond(res, ERR_SYS.code, ERR_SYS.msg, null, configErrors['JWT-SECRET']);
  const { jwtToken, jwtError } = await jwtSign({ email: `${req.body.email}` }, '1d', secretKey);
  if (jwtError !== null) return respond(res, ERR_SYS.code, configErrors['JWT-GENERATE'], null, jwtError);
  respond(res, 200, 'USER_AUTHORIZE_SUCCESS', jwtToken, null);
});
export default router;
