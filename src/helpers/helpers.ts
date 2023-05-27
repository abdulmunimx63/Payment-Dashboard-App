import jwt_decode from "jwt-decode";

interface ACCESS_TOKEN {
  exp: number;
  iss: string;
  aud: string;
  client_id: string;
  sub: string;
  auth_time: number;
  idp: string;
  role: string;
  name: string;
  given_name: string;
  profile: string;
  jti: string;
  iat: number;
  scope: string[];
  amr: string[];
}

// Decode Token:
export const decodeToken = (token: any) => {
  const decodedJwt: ACCESS_TOKEN = jwt_decode(token);
  return decodedJwt;
};

// Get DealerId From Token
export const getDealerIdFromToken = (token: any) => {
  const decodedJwt = decodeToken(token);
  // Get the profile object from token:
  const profileObj = JSON.parse(decodedJwt.profile);
  const dealerId = profileObj.dealerId;
  return dealerId;
};
