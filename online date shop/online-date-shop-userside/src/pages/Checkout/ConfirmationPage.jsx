import PropTypes from 'prop-types'; // Import PropTypes
import { Button, Divider, Result, Spin, Typography, message } from 'antd';
import useCartStore from '../../store/useCartStore';
import ProductInfoTable from './ProductInfoTable';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { processProducts } from '../../utils/processProduct';
import OrderService from '../../service/order.service';

const ConfirmationPage = ({ prevStep }) => {
  const { cart, clearCart, shippingInformation } = useCartStore();

  const [isPaying, setIsPaying] = useState();
  const [orderDone, setOrderDone] = useState(false);

  const items = processProducts(cart);

  const handleConfirmOrder = async () => {
    setIsPaying(true);
    try {
      const res = await OrderService.placeOrder({
        items,
        shippingInfo: shippingInformation,
        status: 'pending',
        userId: JSON.parse(localStorage.getItem('user'))._id,
      });
      if (res) {
        setTimeout(() => {
          setOrderDone(true);
          setIsPaying(false);
          clearCart();
        }, 2000);
      }
    } catch (error) {
      setIsPaying(false);
      message.info("Couldn't place order!!!");
    }
  };

  if (isPaying) {
    return (
      <div className="mt-10" style={{ textAlign: 'center' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        <Typography.Text Text strong className="text-lg" style={{ marginLeft: 8 }}>
          Processing Payment...
        </Typography.Text>
      </div>
    );
  }

  if (orderDone) {
    return (
      <div>
        <Result status={'success'} title="Your order is placed successfully." />
        <div className="flex justify-center">
          <Button type="primary" href="/shop">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Title level={3}>Shipping Information</Title>
      <Divider />
      <p>
        <strong>Full Name:</strong> {shippingInformation.fullName}
      </p>
      <p>
        <strong>Address:</strong> {shippingInformation.address}
      </p>
      <p>
        <strong>City:</strong> {shippingInformation.city}
      </p>
      <p>
        <strong>Postal Code:</strong> {shippingInformation.postalCode}
      </p>
      <br />
      <br />
      <Title level={3}>Product Information</Title>
      <Divider />
      <ProductInfoTable data={items} />

      <br />
      <Button block type="primary" onClick={handleConfirmOrder}>
        Confirm
      </Button>

      <br />
      <br />
      <br />
      <Button type="default" onClick={prevStep}>
        Previous
      </Button>
    </div>
  );
};

// Define PropTypes
ConfirmationPage.propTypes = {
  prevStep: PropTypes.func.isRequired,
};

export default ConfirmationPage;
