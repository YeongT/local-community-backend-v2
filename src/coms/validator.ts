import { Request, Response } from 'express';
import { body as validateBody, validationResult } from 'express-validator';
import { respond } from './respondClient';
import { ERR_PARAM } from './errorMessage';

const validators = {
  email: validateBody('email')
    .exists()
    .withMessage('Parameter must contain `email`')
    .bail()
    .isEmail()
    .withMessage('Parameter must have valid email'),
  password: validateBody('password')
    .exists()
    .withMessage('Parameter must contain `password`')
    .isLength({ min: 7 })
    .withMessage('Parameter must have valid password (At Least 7 character)')
    .bail()
    .custom((value) => {
      const regexPassword = /^.*(?=^.{7,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      const isNotValidPassword = !regexPassword.test(value);
      if (isNotValidPassword) {
        return Promise.reject(
          'Parameter must have valid password (At Least 1 english, 1 special character, 1 numeric character)',
        );
      }
      return true;
    }),
  phone: validateBody('phone')
    .exists()
    .withMessage('Parameter must contain `phone`')
    .bail()
    .custom((value) => {
      const regexPhone = /^01([0-9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
      const isNotValidPhone = !regexPhone.test(value);
      if (isNotValidPhone) {
        return Promise.reject('Parameter must have valid phone (Example : 010-1234-1234)');
      }
      return true;
    }),
  name: validateBody('name')
    .exists()
    .withMessage("Parameter must contain 'name'")
    .isLength({ min: 3, max: 12 })
    .withMessage('Parameter must have valid name (At Least 3 character, Max 12 character)')
    .bail()
    .custom((value) => {
      const regexName = /[0-9]|[a-z]|[A-Z]|[가-힣]/;
      const isNotValidName = !regexName.test(value);
      if (isNotValidName) {
        return Promise.reject(
          'Parameter must have valid name (Must be composed with number, english, korean)',
        );
      }
      return true;
    }),
};

const validatorErrorChecker = (req: Request, res: Response): boolean => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) respond(res, ERR_PARAM.code, ERR_PARAM.msg, null, errors['errors']);
  return errors.isEmpty();
};

export { validators, validatorErrorChecker };
