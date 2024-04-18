import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reFetchData } from '../../store/slice/appSlice';
import ApiService from '../../utils/apiService';
import notificationWithIcon from '../../utils/notification';

function CreateUser() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // function to handle register new user
  const onFinish = (values) => {
    setLoading(true);
    const data = {
      username: values.username,
      fullname: values.fullname,
      email: values.email,
      role: values.role,
      password: values.password,
    };

    ApiService.post('/users', data)
      .then((response) => {
        setLoading(false);
        if (response) {
          notificationWithIcon('success', 'SUCCESS', 'New user registration successful');
          form.resetFields();
          dispatch(reFetchData());
        } else {
          notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
        }
      })
      .catch((err) => {
        setLoading(false);
        notificationWithIcon(
          'error',
          'ERROR',
          err?.response?.data?.result?.error?.message ||
            err?.response?.data?.result?.error ||
            'Sorry! Something went wrong. App server error',
        );
      });
  };

  return (
    <Form form={form} className="w-full" name="create-new-user" onFinish={onFinish} layout="vertical">
      <div>
        <Form.Item
          className="w-full "
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            size="large"
            type="text"
            allowClear
          />
        </Form.Item>

        <Form.Item
          className="w-full "
          label="Full Name"
          name="fullname"
          rules={[
            {
              required: true,
              message: 'Please input your Full Name!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Full Name"
            size="large"
            type="text"
            allowClear
          />
        </Form.Item>
      </div>

      <div className="two-grid-column">
        <Form.Item
          className="w-full "
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            size="large"
            type="email"
            allowClear
          />
        </Form.Item>
      </div>

      <div className="two-grid-column">
        <Form.Item
          className="w-full "
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: 'Please input your Role!',
            },
          ]}
        >
          <Select
            placeholder="-- select user role --"
            optionFilterProp="children"
            options={[
              { value: 'user', label: 'User' },
              { value: 'admin', label: 'Admin' },
            ]}
            size="large"
            allowClear
          />
        </Form.Item>
      </div>

      <div className="two-grid-column">
        <Form.Item
          className="w-full"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            size="large"
            type="text"
            allowClear
          />
        </Form.Item>
      </div>

      <Form.Item>
        <Button
          className="login-form-button w-full bg-color-primary mt-4"
          htmlType="submit"
          type="primary"
          size="large"
          loading={loading}
          disabled={loading}
        >
          Register User
        </Button>
      </Form.Item>
    </Form>
  );
}

export default React.memo(CreateUser);
