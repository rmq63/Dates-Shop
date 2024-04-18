import axios from 'axios';

class OrderService {
  static async placeOrder(orderData) {
    try {
      const response = await axios.post('http://localhost:3000/orders', orderData);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default OrderService;
