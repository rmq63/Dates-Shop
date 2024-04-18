import PropTypes from 'prop-types'; // Import PropTypes
import { Form, Input, Button } from 'antd';

const PaymentForm = ({ nextStep, prevStep, setFormData }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setFormData({ ...values });
    nextStep();
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          cardNumber: '',
          expiryDate: '',
          cvv: '',
        }}
      >
        <Form.Item
          name="cardNumber"
          label="Card Number"
          rules={[{ required: true, message: 'Please enter your card number' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="expiryDate"
          label="Expiry Date"
          rules={[{ required: true, message: 'Please enter expiry date' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="cvv" label="CVV" rules={[{ required: true, message: 'Please enter CVV' }]}>
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
PaymentForm.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default PaymentForm;
