interface AccessDataObject {
  email: string;
}

interface RefreshDataObject {
  email: string;
  decodable: boolean;
}

interface RefreshAccessTokenDataObject {
  refresh: string;
  data: AccessDataObject;
}

interface TokenPair {
  access: string;
  refresh: string;
}

interface JWTSignResult {
  token?: string;
  error: Error | null;
}

interface JWTResponse {
  jwtToken: TokenPair | null;
  jwtError: string | null;
}

export {
  AccessDataObject,
  RefreshDataObject,
  RefreshAccessTokenDataObject,
  TokenPair,
  JWTSignResult,
  JWTResponse,
};
