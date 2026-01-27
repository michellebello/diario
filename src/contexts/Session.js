const TOKEN_KEY = "CONTADOR_TOKEN";

export const setToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const getTokenHeader = () => {
  return { [TOKEN_KEY]: getToken() };
};

export const clearToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};
