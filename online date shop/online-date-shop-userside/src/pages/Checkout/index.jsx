import { useState } from 'react';
import { Steps } from 'antd';

import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import ConfirmationPage from './ConfirmationPage';

const { Step } = Steps;

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: 'Shipping Information',
      content: <ShippingForm nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} />,
    },
    {
      title: 'Payment Details',
      content: <PaymentForm nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} />,
    },
    { title: 'Confirmation', content: <ConfirmationPage formData={formData} prevStep={prevStep} /> },
  ];

  return (
    <div className="w-full lg:w-fit mx-auto lg:my-10 lg:p-10 py-10 px-2">
      <Steps current={currentStep} style={{ marginBottom: '20px' }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content w-full">{steps[currentStep].content}</div>
    </div>
  );
};

export default Checkout;
