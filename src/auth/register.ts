import { Request, Response, Router } from 'express';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { DBError } from '../../server/app';
import respond from '../coms/respondClient';
import { validatorErrorChecker, validators } from '../coms/validator';
import { configErrors, ERR_DB, ERR_NOT_AUTH, ERR_SYS } from '../coms/errorMessage';
import { getNewSignedJWTPair as jwtSign } from '../jwtauth/jwtSign';
import { emailDuplicationCheck } from './emailCheck';

import User from '../../models/user';

const router = Router();

router.post(
  '/',
  validators.email,
  validators.password,
  validators.phone,
  validators.name,
  async (req: Request, res: Response) => {
    //# CHECK DB STATUS
    if (DBError !== null) return respond(res, ERR_DB.code, ERR_DB.msg, null, DBError);

    //# AUTHORIZATION
    const authKey = process.env.REGISTER_BASIC_AUTH_KEY;
    if (authKey === undefined)
      return respond(res, ERR_SYS.code, ERR_SYS.msg, null, configErrors['HTTP-BASIC']);
    if (req.headers.authorization !== `Basic ${authKey}`)
      return respond(res, ERR_NOT_AUTH.code, ERR_NOT_AUTH.msg, null, null);

    //# CHECK PARAMETER ERROR & EMAIL DUPLICATION CHECK
    if (validatorErrorChecker(req, res) !== null) return;
    if ((await emailDuplicationCheck(res, req.body.email)) !== null) return;

    //# ENCRYPT USER PASSWORD WITH RANDOM SALT
    const salt = randomBytes(32);
    const encryptPassword = pbkdf2Sync(req.body.password, salt.toString('base64'), 100000, 64, 'SHA512');
    if (!encryptPassword)
      return respond(res, ERR_SYS.code, 'ERR_PASSWORD_ENCRYPT_FAILED', null, encryptPassword);

    //# SAVE USER ACCOUNT ON DATABASE
    const createUser = new User({
      account: {
        email: req.body.email,
      },
      profile: {
        name: req.body.name,
        phone: req.body.phone,
      },
      auth: {
        password: `${encryptPassword.toString('base64')}`,
        salt: `${salt.toString('base64')}`,
      },
    });

    //# GENERATE NEW USER JWT TOKEN
    const secretKey = process.env.JWT_TOKEN_SECRETKEY;
    if (secretKey === undefined)
      return respond(res, ERR_SYS.code, ERR_SYS.msg, null, configErrors['JWT-SECRET']);
    const { jwtToken, jwtError } = jwtSign({ email: req.body.email }, '5d', secretKey);
    if (jwtError !== null) return respond(res, ERR_SYS.code, configErrors['JWT-GENERATE'], null, jwtError);

    //# SAVE USER ACCOUNT INTO DATABASE
    const userSaveResult = await createUser.save();
    if (!userSaveResult) return respond(res, 500, 'ERR_USER_SAVE_FAILED', null, userSaveResult);
    respond(res, 200, 'SUCCEED_USER_CREATED', jwtToken, null);
  },
);
export default router;
