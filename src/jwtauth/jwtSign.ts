import { sign as _sign } from 'jsonwebtoken';
import { configErrors } from '../coms/errorMessage';
import { AccessDataObject, JWTResponse, RefreshAccessTokenDataObject } from './jwtCommon';

const getNewSignedJWTPair = (
  accessData: AccessDataObject,
  expiresIn: string,
  secretKey: string,
): JWTResponse => {
  var _response: JWTResponse = { jwtToken: null, jwtError: configErrors['JWT-GENERATE'] };
  try {
    const signedAccess = _sign(accessData, secretKey, { expiresIn });
    const signedRefresh = _sign(
      {
        decodable: false,
        email: accessData.email,
      },
      secretKey,
      { expiresIn: '14d' },
    );
    _response.jwtToken = {
      access: signedAccess,
      refresh: signedRefresh,
    };
    _response.jwtError = null;
    return _response;
  } catch (err: any) {
    _response.jwtError = err.toString();
    return _response;
  }
};

const refreshSignedAccessToken = (
  refreshTokenData: RefreshAccessTokenDataObject,
  expiresIn: string,
  secretKey: string,
): JWTResponse => {
  var _response: JWTResponse = { jwtToken: null, jwtError: configErrors['JWT-GENERATE'] };
  try {
    const signedAccess = _sign(refreshTokenData.data, secretKey, { expiresIn });
    _response.jwtToken = {
      access: signedAccess,
      refresh: refreshTokenData.refresh,
    };
    _response.jwtError = null;
    return _response;
  } catch (err: any) {
    _response.jwtError = err.toString();
    return _response;
  }
};

export { getNewSignedJWTPair, refreshSignedAccessToken };
