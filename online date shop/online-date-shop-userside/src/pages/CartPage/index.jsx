import { Table, Button, Image, message } from 'antd';
import useCartStore from '../../store/useCartStore';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCartStore();

  // Create a map to aggregate quantities for items with the same ID
  const cartMap = cart.reduce((map, item) => {
    if (map.has(item._id)) {
      map.get(item._id).quantity += 1; // Increment the quantity by 1
    } else {
      map.set(item._id, { ...item, quantity: 1 }); // Set quantity to 1 for new items
    }
    return map;
  }, new Map());

  // Convert the map back to an array of items
  const aggregatedCart = Array.from(cartMap.values());

  const totalPrice = aggregatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => <Image src={record.image} alt={record.type} width={50} />,
    },
    {
      title: 'Name',
      dataIndex: 'type',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => `$${record.price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <Button type="danger" onClick={() => removeFromCart(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-8 w-3/4 h-screen">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <Table dataSource={aggregatedCart} columns={columns} pagination={false} />
      <div className="mt-8 flex justify-between items-center">
        <div></div>
        {/* <Input placeholder="Apply Coupon" style={{ width: 200 }} /> */}
        <div>
          <p className="text-lg">Total Price: ${totalPrice}</p>
          <Button
            type="primary"
            size="large"
            className="ml-4"
            onClick={() => {
              if (cart.length > 0) {
                navigate('/checkout');
              } else {
                message.info('You have no items in the cart.', 1);
              }
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
