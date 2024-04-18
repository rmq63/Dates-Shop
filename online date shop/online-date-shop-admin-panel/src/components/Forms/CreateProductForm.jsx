import { Button, Form, Input, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reFetchData } from '../../store/slice/appSlice';
import ApiService from '../../utils/apiService';
import notificationWithIcon from '../../utils/notification';

function CreateProductForm() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // function to handle creating a new product
  const onFinish = (values) => {
    setLoading(true);
    const data = {
      type: values.type,
      description: values.description,
      origin: values.origin,
      color: values.color,
      size: values.size,
      price: parseFloat(values.price),
      itemsRemaining: parseInt(values.itemsRemaining),
      image: values.image,
    };

    ApiService.post('/products', data)
      .then((response) => {
        setLoading(false);
        if (response) {
          notificationWithIcon('success', 'SUCCESS', 'New product creation successful');
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
    <Form form={form} className="w-full" name="create-new-product" onFinish={onFinish} layout="vertical">
      <div>
        <Form.Item
          className="w-full"
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: 'Please input the product type!',
            },
          ]}
        >
          <Input placeholder="Type" size="large" allowClear />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input the product description!',
            },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Description" allowClear />
        </Form.Item>
      </div>

      <div className="two-grid-column">
        <Form.Item className="w-full" label="Origin" name="origin">
          <Input placeholder="Origin" size="large" allowClear />
        </Form.Item>
      </div>

      <div className="two-grid-column">
        <Form.Item className="w-full" label="Color" name="color">
          <Input placeholder="Color" size="large" allowClear />
        </Form.Item>
      </div>

      <div className="two-grid-column">
        <Form.Item className="w-full" label="Size" name="size">
          <Input placeholder="Size" size="large" allowClear />
        </Form.Item>
      </div>

      <div className="two-grid-column">
        <Form.Item
          className="w-full"
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input the product price!',
            },
          ]}
        >
          <Input placeholder="Price" size="large" type="number" allowClear />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Items In Stock"
          name="itemsRemaining"
          rules={[
            {
              required: true,
              message: 'Please input the total items in stock',
            },
          ]}
        >
          <Input placeholder="Items In Stock" size="large" type="number" allowClear />
        </Form.Item>
      </div>

      <div className="two-grid-column">
        <Form.Item
          className="w-full"
          label="Image URL"
          name="image"
          rules={[
            {
              required: true,
              message: 'Please input the product Image URL!',
            },
          ]}
        >
          <Input placeholder="Image URL" size="large" allowClear />
        </Form.Item>
      </div>

      <Form.Item>
        <Button
          className="w-full bg-color-primary mt-4"
          htmlType="submit"
          type="primary"
          size="large"
          loading={loading}
          disabled={loading}
        >
          Create Product
        </Button>
      </Form.Item>
    </Form>
  );
}

export default React.memo(CreateProductForm);
