import { Button, Empty, Pagination, Result, Skeleton, Tag, Tooltip, Table, Popconfirm, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import useFetchData from '../../hooks/useFetchData';
import QueryOptions from '../shared/QueryOptions';
import OrderStatusUpdateModal from '../shared/OrderStatusUpdateModal';
import dayjs from 'dayjs';

function Orders() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [query, setQuery] = useState({
    search: '',
    sort: 'desc',
    page: '1',
    rows: '10',
  });
  const [statusUpdateModal, setStatusUpdateModal] = useState({ open: false, orderId: null, status: null });

  // fetch booking-list API data
  const [loading, error, response] = useFetchData(
    `/orders?keyword=${query.search}&limit=${query.rows}&page=${query.page}&sort=${query.sort}`,
    fetchAgain,
  );

  // reset query options
  useEffect(() => {
    setQuery((prevState) => ({ ...prevState, page: '1' }));
  }, [query.rows, query.search]);

  const columns = [
    {
      title: 'Order Name',
      dataIndex: 'user',
      key: 'username',
      render: (record) => {
        return <p>{record?.username}</p>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'email',
      render: (record) => {
        return <p>{record?.email}</p>;
      },
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <Image src={item?.product?.image} width={50} height={50} />
              <p>Product Name: {item?.product?.type}</p>
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
      render: (status, record) => (
        <div className="flex flex-col items-center">
          {status}
          {status !== 'completed' && (
            <Button
              ghost
              type="primary"
              size="small"
              onClick={() =>
                setStatusUpdateModal((prevState) => ({
                  ...prevState,
                  open: true,
                  orderId: record._id,
                  status: status,
                }))
              }
            >
              Update Status
            </Button>
          )}
        </div>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => dayjs(createdAt).format('YYYY-MM-DD hh:mm A'),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt) => dayjs(updatedAt).format('YYYY-MM-DD hh:mm A'),
    },
    {
      title: 'Shipping info',
      dataIndex: 'shippingInfo',
      key: 'shippingInfo',
      render: (record) => {
        return (
          <p>
            Full Name: <Tag>{record?.fullName}</Tag>
            <br />
            City: <Tag>{record?.city}</Tag>
            <br />
            Address: <span>{record?.address}</span>
            <br />
            postal code: <Tag>{record?.postalCode}</Tag>
          </p>
        );
      },
    },
    // {
    //   title: 'Actions',
    //   dataIndex: 'actions',
    //   key: 'actions',
    //   render: (_, record) => (
    //     <Popconfirm
    //       title="Are you sure to delete this order?"
    //       onConfirm={() => handleDeleteOrder(record._id)}
    //       okText="Yes"
    //       cancelText="No"
    //     >
    //       <Button danger>Delete</Button>
    //     </Popconfirm>
    //   ),
    // },
  ];

  const handleDeleteOrder = async (orderId) => {
    try {
      const res = await ApiService.delete(`/orders/${orderId}`);
      if (res) {
        notificationWithIcon('success', 'SUCCESS', 'Order delete successful');
        setFetchAgain(!fetchAgain);
        resolve();
      } else {
        notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
        reject();
      }
    } catch (error) {
      notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
      reject();
    }
  };

  return (
    <div className="p-5">
      {/* booking list ― query section */}
      <QueryOptions query={query} setQuery={setQuery} />

      {/* order list ― content section */}
      <div className="w-full flex flex-row flex-wrap items-center justify-center gap-2">
        {error ? (
          <Result title="Failed to fetch" subTitle={error} status="error" />
        ) : (
          <Skeleton loading={loading} paragraph={{ rows: 10 }} active>
            {response?.length === 0 ? (
              <Empty className="mt-10" description={<span>Sorry! Any data was not found.</span>} />
            ) : (
              <Table
                className="w-screen my-5"
                columns={columns}
                dataSource={response}
                pagination={false}
                rowKey={(record) => record.id || uniqueId()}
              />
            )}
          </Skeleton>
        )}
      </div>

      {/* booking list ― pagination */}
      {response?.data?.total_page > 1 && (
        <Pagination
          className="my-5"
          onChange={(e) => setQuery((prevState) => ({ ...prevState, page: e }))}
          total={response?.data?.total_page * 10}
          current={response?.data?.current_page}
        />
      )}

      {/* order status update modal component */}
      {statusUpdateModal?.open && (
        <OrderStatusUpdateModal
          statusUpdateModal={statusUpdateModal}
          setStatusUpdateModal={setStatusUpdateModal}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
}

export default Orders;
