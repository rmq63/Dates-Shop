class AuthStatus {
  static isLoggedIn() {
    return !!localStorage.getItem('authToken');
  }

  static getUserData() {
    if (localStorage) {
      return JSON.parse(localStorage.getItem('user'));
    }
  }
}

export default AuthStatus;
