import { Request, Response, Router } from 'express';
import { DBError } from '../../server/app';
import { respond } from '../coms/respondClient';
import { validatorErrorChecker, validators } from '../coms/validator';
import { ERR_DB, ERR_EMAIL_DUPLICATION } from '../coms/errorMessage';

import { UserModel, UserObject } from '../../models/user';

const router = Router();

const emailDuplicationCheck = async (res: Response, email: string): Promise<boolean> => {
  const _user: UserObject | null = await UserModel.findOne({ 'account.email': `${email}` }, { _id: 0 });
  if (_user !== null) respond(res, ERR_EMAIL_DUPLICATION.code, ERR_EMAIL_DUPLICATION.msg, null, null);
  return _user === null;
};

router.post('/', validators.email, async (req: Request, res: Response) => {
  //# CHECK DB STATUS
  if (DBError !== null) return respond(res, ERR_DB.code, ERR_DB.msg, null, DBError);

  //# CHECK PARAMETER ERROR
  if (!validatorErrorChecker(req, res)) return;

  if (!(await emailDuplicationCheck(res, req.body.email))) return;
  else respond(res, 200, 'THIS EMAIL CAN BE USED', null, null);
});

export { router as emailCheckAPI, emailDuplicationCheck };
