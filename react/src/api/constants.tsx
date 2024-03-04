
export const getToken = () => localStorage.getItem("access_token");
export const getAuthorizationHeader = () => `Bearer ${getToken()}`;
/** ENDPOINTS */
export const BASEURL = 'http://localhost:8000/';
export const RegisterURL = BASEURL + 'register/';
export const LogInURL = BASEURL + 'login/';
export const getItemsURL = BASEURL + 'api/items';