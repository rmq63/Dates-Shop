import PropTypes from 'prop-types';
import { Card, Button, Tag } from 'antd';
import useCartStore from '../../store/useCartStore';

const DateCard = ({ dateProduct }) => {
  const { addToCart } = useCartStore();

  return (
    <Card
      hoverable
      cover={<img alt={dateProduct.type} src={dateProduct.image} style={{ height: '200px', objectFit: 'cover' }} />}
      style={{ width: '300px', height: '430px', marginBottom: '20px' }}
    >
      <div style={{ marginBottom: '10px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>{dateProduct.type}</h2>
        <p style={{ fontSize: '14px', marginBottom: '10px' }}>Description: {dateProduct.description}</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <Tag color="blue">Origin: {dateProduct.origin}</Tag>
        <Tag color="green">Color: {dateProduct.color}</Tag>
        <Tag color="orange">Size: {dateProduct.size}</Tag>
      </div>
      <div className="p-2 flex justify-between items-center">
        <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Price: ${dateProduct.price}</p>
        <Button
          disabled={dateProduct.itemsRemaining <= 0}
          type="primary"
          onClick={() => addToCart(dateProduct)}
          style={{ backgroundColor: 'black' }}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

DateCard.propTypes = {
  dateProduct: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    itemsRemaining: PropTypes.number.isRequired,
  }).isRequired,
};

export default DateCard;
