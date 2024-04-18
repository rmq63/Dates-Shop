import { UserAddOutlined } from '@ant-design/icons';
import { Button, Modal, Tabs } from 'antd';
import React, { useState } from 'react';
import UsersTable from '../Tables/UsersTable';
import '../../index.css';
import CreateUserForm from '../Forms/CreateUserForm';

function Users() {
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
    label: 'Users List',
    children: <UsersTable />,
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
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Button
            className="inline-flex items-center myButton my-3"
            icon={<UserAddOutlined />}
            onClick={showModal}
            type="primary"
            size="large"
          >
            Create User
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
        <CreateUserForm />
      </Modal>
    </>
  );
}

export default React.memo(Users);
