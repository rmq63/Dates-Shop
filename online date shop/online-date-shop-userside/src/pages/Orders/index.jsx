import { Image, Table, Tag, Typography } from 'antd';
import { useQuery } from 'react-query';
import axios from 'axios';

const Orders = () => {
  const {
    isLoading,
    error,
    data: orders,
  } = useQuery('Orders', () =>
    axios
      .get(`http://localhost:3000/orders/user/${JSON.parse(localStorage.getItem('user'))._id}`)
      .then((res) => res.data),
  );

  const columns = [
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <Image src={item?.productId.image} width={50} height={50} />
              <p>Product Name: {item?.productId.type}</p>
              <p>Quantity: {item?.quantity}</p>
              <p>Total Price: {item?.totalPrice}</p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={status === 'pending' ? 'orange' : 'green'}>{status.toUpperCase()}</Tag>,
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-10 px-4">
      <Typography.Title level={2}>User Orders</Typography.Title>
      <Table dataSource={orders} columns={columns} rowKey="_id" pagination={false} />
    </div>
  );
};

export default Orders;
