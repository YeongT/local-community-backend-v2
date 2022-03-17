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

const ERR_JWT_BLOCKED: ErrorMessage = {
  code: 403,
  msg: 'ERR_NOT_GRANTED_JWT_TOKEN',
};

const ERR_PARAM: ErrorMessage = {
  code: 412,
  msg: 'ERR_PARAMETERS_NOT_ACCEPTED',
};

const ERR_EMAIL_DUPLICATION: ErrorMessage = {
  code: 409,
  msg: 'ERR_EMAIL_ALREADY_IN_USE',
};

const ERR_LOGIN_FAILED: ErrorMessage = {
  code: 409,
  msg: 'ERR_WRONG_EMAIL_OR_PASSWORD',
};

const configErrors = {
  'HTTP-BASIC': 'ERR_MISSING_HTTP_BASIC_AUTH_KEY',
  'JWT-SECRET': 'ERR_MISSING_JWT_TOKEN_SECRET_KEY',
  'JWT-GENERATE': 'ERR_JWT_TOKEN_GENERATE_FAILED',
  'JWT-VERIFY-ERROR': 'ERR_MISCONFIG_IN_JWT_VERIFY_FUNCTION',
  'JWT-BLACKED': 'ERR_JWT_TOKEN_IS_IN_BLACKLIST',
  'JWT-EXPIRED': 'ERR_JWT_TOKEN_EXPIRED',
  'JWT-USER-DENIED': 'ERR_JWT_USER_NOT_ACCESIBLE',
};

export {
  ERR_SYS,
  ERR_DB,
  ERR_NOT_AUTH,
  ERR_JWT_BLOCKED,
  ERR_PARAM,
  ERR_EMAIL_DUPLICATION,
  ERR_LOGIN_FAILED,
  configErrors,
};
