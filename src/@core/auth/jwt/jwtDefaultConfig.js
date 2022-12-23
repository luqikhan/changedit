// ** Auth Endpoints
export default {
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  // logoutEndpoint: '/jwt/logout',
  // loginEndpoint:
  //   "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANF919hgWyNK4E5Er3T2n1vggTu0PnHFk",
  // registerEndpoint:
  //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANF919hgWyNK4E5Er3T2n1vggTu0PnHFk",
  // refreshEndpoint:
  //   "https://securetoken.googleapis.com/v1/token?key=AIzaSyANF919hgWyNK4E5Er3T2n1vggTu0PnHFk",
  logoutEndpoint: "/jwt/logout",

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken"
};
