interface ErrorMessage {
  code: number;
  msg: string;
}

const ERR_SYS: ErrorMessage = {
  code: 500,
  msg: 'ERR_INVALID_SERVER_CONFIGURATION',
};

const ERR_DB: ErrorMessage = {
  code: 500,
  msg: 'ERR_DATABASE_DISCONNECTED',
};

const ERR_NOT_AUTH: ErrorMessage = {
  code: 403,
  msg: 'ERR_NOT_AUTHORIZED_IDENTITY',
};

const ERR_PARAM: ErrorMessage = {
  code: 412,
  msg: 'ERR_PARAMETERS_NOT_ACCEPTED',
};

const ERR_EMAIL_DUPLICATION: ErrorMessage = {
  code: 409,
  msg: 'ERR_EMAIL_ALREADY_IN_USE',
};

const configErrors = {
  'HTTP-BASIC': 'ERR_MISSING_HTTP_BASIC_AUTH_KEY',
  'JWT-SECRET': 'ERR_MISSING_JWT_TOKEN_SECRET_KEY',
  'JWT-GENERATE': 'ERR_JWT_TOKEN_GENERATE_FAILED',
};

export { ERR_SYS, ERR_DB, ERR_NOT_AUTH, ERR_PARAM, ERR_EMAIL_DUPLICATION, configErrors };
