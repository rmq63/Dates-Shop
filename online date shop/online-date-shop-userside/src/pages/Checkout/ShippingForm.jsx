import PropTypes from 'prop-types'; // Import PropTypes
import { Form, Input, Button } from 'antd';
import useCartStore from '../../store/useCartStore';

const ShippingForm = ({ nextStep, prevStep }) => {
  const [form] = Form.useForm();

  const { shippingInformation, addShippingInfo } = useCartStore();

  const onFinish = (values) => {
    addShippingInfo({ ...values });
    nextStep();
  };

  return (
    <div>
      <h2>Shipping Information</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          fullName: shippingInformation?.fullName ?? '',
          address: shippingInformation?.address ?? '',
          city: shippingInformation?.city ?? '',
          postalCode: shippingInformation?.postalCode ?? '',
        }}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter your address' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter your city' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="postalCode"
          label="Postal Code"
          rules={[{ required: true, message: 'Please enter your postal code' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="default" onClick={prevStep}>
            Previous
          </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// Define PropTypes
ShippingForm.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default ShippingForm;
