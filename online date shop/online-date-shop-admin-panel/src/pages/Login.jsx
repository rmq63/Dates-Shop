/* eslint-disable no-undef */
// Import necessary components and styles
import { LoadingOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useTimeout from '../hooks/useTimeout';
import ApiService from '../utils/apiService';
import Logo from '../components/Logo';
import { setAuth } from '../utils/authentication';

function Login() {
  // Set document title
  window.document.title = 'Online Date Shop — Login';

  // State variables
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  // Timeout callback
  const [timeout] = useTimeout(() => {
    setErrMsg('');
  }, 2000);
  timeout();

  // Function to handle user login
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await ApiService.post('/auth/login', values);
      console.log(response);

      if (response) {
        setAuth(response?.accessToken, response?.user);
        window.location.href = '/main/dashboard';
      } else {
        setErrMsg('Sorry! Something went wrong. App server error!!!');
      }
    } catch (error) {
      setErrMsg(error || 'Sorry! Something went wrong. App server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Link to="/">
          <Logo />
        </Link>

        {errMsg && <Alert message={errMsg} type="error" className="mb-6" />}

        <Form
          name="online-dateshop-login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item name="email" rules={[{ type: 'email', required: true, message: 'Please input your Email!' }]}>
            <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Enter your Email" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Enter your Password" />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              disabled={loading}
              loading={loading}
              htmlType="submit"
              type="primary"
            >
              {loading ? <LoadingOutlined /> : 'Login'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default React.memo(Login);
