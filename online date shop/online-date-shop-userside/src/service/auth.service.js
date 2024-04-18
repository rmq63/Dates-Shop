import axios from 'axios';

class AuthService {
  static async register(userData) {
    try {
      const response = await axios.post('http://localhost:3000/users', userData);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async login(authData) {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', authData);
      localStorage.setItem('authToken', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  }
}

export default AuthService;
