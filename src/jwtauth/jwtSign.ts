import { sign } from 'jsonwebtoken';
import { configErrors } from '../coms/errorMessage';
import { AccessDataObject, RefreshDataObject, JWTResponse, JWTSignResult } from './jwtCommon';

const jwtSign = (
  data: AccessDataObject | RefreshDataObject,
  expiresIn: string,
  secretKey: string,
): Promise<JWTSignResult> => {
  return new Promise((result): void => {
    sign(data, secretKey, { expiresIn }, (err, encoded) => {
      result({ token: encoded, error: err });
    });
  });
};

const getNewSignedJWTPair = async (
  accessData: AccessDataObject,
  expiresIn: string,
  secretKey: string,
): Promise<JWTResponse> => {
  const _response: JWTResponse = { jwtToken: null, jwtError: configErrors['JWT-GENERATE'] };
  const refreshData: RefreshDataObject = {
    email: accessData.email,
    decodable: false,
  };
  const accessResult: JWTSignResult = await jwtSign(accessData, expiresIn, secretKey),
    refreshResult: JWTSignResult = await jwtSign(refreshData, expiresIn, secretKey);
  if (accessResult.error !== null) {
    _response.jwtError = accessResult.error.message;
    return _response;
  }

  if (refreshResult.error !== null) {
    _response.jwtError = refreshResult.error.message;
    return _response;
  }

  if (accessResult.token !== undefined && refreshResult.token !== undefined) {
    _response.jwtToken = {
      access: accessResult.token,
      refresh: refreshResult.token,
    };
    _response.jwtError = null;
  }
  return _response;
};

export default getNewSignedJWTPair;
