import { Form, Input, Button, message } from 'antd';
import AuthService from '../../../service/auth.service';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      // Handle form submission
      const createdUser = await AuthService.register({
        fullname: `${values.firstName} ${values.lastName}`,
        username: values.username,
        email: values.email,
        password: values.password,
        role: 'user',
      });
      if (createdUser.data) {
        form.resetFields();
        message.info('You are registered successfully. Now Login');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      message.info(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <Form form={form} name="register" initialValues={{ remember: true }} onFinish={onFinish} scrollToFirstError>
        <Form.Item name="firstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
          <Input size="large" placeholder="First Name" />
        </Form.Item>

        <Form.Item name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
          <Input size="large" placeholder="Last Name" />
        </Form.Item>

        <Form.Item name="username" rules={[{ required: true, message: 'Please enter your username' }]}>
          <Input size="large" placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" size="large">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
