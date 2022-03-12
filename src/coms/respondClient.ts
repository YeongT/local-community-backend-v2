import { Response as Res } from 'express';
import { TokenPair } from '../jwtauth/jwtCommon';

interface Response {
  returnCode: number;
  bodymsg: string;
  output: TokenPair | null;
  error: object | string | null;
}

const _response: Response = {
  returnCode: 500,
  bodymsg: 'ERR_SERVER_FAILED_TEMPORARILY',
  output: null,
  error: null,
};

const respond = (
  res: Res,
  returnCode: number,
  bodymsg: string,
  output: TokenPair | null,
  error: object | string | null,
): Response => {
  _response.returnCode = returnCode;
  _response.bodymsg = bodymsg;
  _response.output = output;
  _response.error = error;
  res.status(200).json(_response);
  return _response;
};

export default respond;
