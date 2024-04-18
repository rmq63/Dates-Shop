import { Button, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import ApiService from '../../utils/apiService';
import notificationWithIcon from '../../utils/notification';

function OrderStatusUpdateModal({ statusUpdateModal, setStatusUpdateModal, setFetchAgain }) {
  const [orderStatus, setOrderStatus] = useState([
    { value: 'pending', label: 'Pending', disabled: true },
    { value: 'shipped', label: 'Shipped', disabled: false },
    { value: 'delivered', label: 'Delivered', disabled: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (statusUpdateModal?.status === 'pending') {
      setOrderStatus([
        { value: 'pending', label: 'Pending', disabled: true },
        { value: 'shipped', label: 'Shipped', disabled: false },
        { value: 'delivered', label: 'Delivered', disabled: false },
      ]);
    }
  }, [statusUpdateModal]);

  // function to handle update order status
  const handleUpdateStatus = () => {
    if (!status) {
      notificationWithIcon('error', 'ERROR', 'Please select an status first to update order status');
    } else {
      setLoading(true);
      ApiService.put(`/orders/${statusUpdateModal?.orderId}/status`, { status })
        .then((res) => {
          setLoading(false);
          if (res) {
            notificationWithIcon('success', 'SUCCESS', 'Order status update successful');
            setStatusUpdateModal((prevState) => ({ ...prevState, open: false, status: null }));
            setFetchAgain((prevState) => !prevState);
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
    }
  };

  return (
    <Modal
      title="Update Order Status:"
      open={statusUpdateModal?.open}
      onOk={() => setStatusUpdateModal((prevState) => ({ ...prevState, open: false, status: null }))}
      onCancel={() => setStatusUpdateModal((prevState) => ({ ...prevState, open: false, status: null }))}
      footer={[
        <Button
          onClick={() => setStatusUpdateModal((prevState) => ({ ...prevState, open: false, status: null }))}
          key="back"
        >
          Cancel
        </Button>,
        <Button
          className="bg-color-primary"
          onClick={handleUpdateStatus}
          type="primary"
          key="submit"
          disabled={loading}
          loading={loading}
        >
          Ok
        </Button>,
      ]}
    >
      <Select
        className="w-full my-5"
        placeholder="-- select order status --"
        optionFilterProp="children"
        options={orderStatus}
        size="large"
        allowClear
        value={status}
        onChange={(value) => setStatus(value)}
      />
    </Modal>
  );
}

export default OrderStatusUpdateModal;
