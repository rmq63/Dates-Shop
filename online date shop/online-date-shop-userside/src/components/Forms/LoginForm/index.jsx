import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import AuthService from '../../../service/auth.service';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // Handle form submission
    try {
      const response = await AuthService.login({
        email: values.email,
        password: values.password,
      });
      if (response.data) {
        navigate('/');
      }
    } catch (error) {
      message.info(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <Form name="login" initialValues={{ remember: false }} onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email' }]}>
          <Input size="large" placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password' }]}>
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            Login
          </Button>
        </Form.Item>
      </Form>

      <Divider dashed />

      <p className="text-center">
        Not have an account? <a href="/register">Create One</a>
      </p>
    </div>
  );
};

export default LoginForm;
