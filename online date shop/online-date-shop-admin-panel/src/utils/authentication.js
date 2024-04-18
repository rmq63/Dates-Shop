/* eslint-disable no-undef */
export function setAuth(token, userInfo) {
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', userInfo);
}

export function getSessionUser() {
  return localStorage.getItem('user');
}

export function getSessionToken() {
  return localStorage.getItem('authToken');
}

export function removeSessionAndLogoutUser() {
  localStorage.removeItem('user')
  localStorage.removeItem('authToken')
}