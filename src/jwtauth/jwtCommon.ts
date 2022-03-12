interface AccessDataObject {
  email: string;
}

interface RefreshAccessTokenDataObject {
  refresh: string;
  data: AccessDataObject;
}

interface TokenPair {
  access: string;
  refresh: string;
}

interface JWTResponse {
  jwtToken: TokenPair | null;
  jwtError: string | null;
}

export { AccessDataObject, RefreshAccessTokenDataObject, TokenPair, JWTResponse };
