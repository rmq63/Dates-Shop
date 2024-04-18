import { UserAddOutlined } from '@ant-design/icons';
import { Button, Modal, Tabs } from 'antd';
import React, { useState } from 'react';
import '../../index.css';
import ProductsTable from '../Tables/ProductsTable';
import CreateProductForm from '../Forms/CreateProductForm';

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // default tab pane and component
  const defaultPanes = new Array(1).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: 'Product List',
    children: <ProductsTable />,
    closable: false,
  }));

  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);

  return (
    <>
      <Tabs
        className="px-5"
        onChange={(key) => setActiveKey(key)}
        tabBarExtraContent={
          <Button
            className="inline-flex items-center myButton my-3"
            icon={<UserAddOutlined />}
            onClick={showModal}
            type="primary"
            size="large"
          >
            Create Product
          </Button>
        }
        activeKey={activeKey}
        type="line"
        items={items}
        size="large"
        hideAdd
      />
      <Modal
        centered
        title="Create a New User"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        className="lg:my-10"
        classNames={{ body: 'my-5' }}
      >
        <CreateProductForm />
      </Modal>
    </>
  );
}

export default React.memo(Products);
