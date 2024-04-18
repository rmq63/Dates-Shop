import { ExclamationCircleFilled } from '@ant-design/icons';
import { Avatar, Button, Empty, Modal, Pagination, Result, Skeleton, Tag, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import useFetchData from '../../hooks/useFetchData';
import ApiService from '../../utils/apiService';
import { getSessionUser } from '../../utils/authentication';
import notificationWithIcon from '../../utils/notification';
import QueryOptions from '../shared/QueryOptions';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

function UsersTable() {
  const user = getSessionUser();
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => <span className="!lowercase">{email}</span>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag className="w-[60px] text-center uppercase" color={role === 'admin' ? 'magenta' : 'purple'}>
          {role}
        </Tag>
      ),
    },
    {
      title: 'User Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <span className="!px-0 text-center">
          <Button className="inline-flex items-center !px-2" onClick={() => navigate('/main/profile')} type="link">
            View
          </Button>
          {user._id !== record._id && (
            <Button className="inline-flex items-center !px-2" onClick={() => handleDeleteUser(record._id)} type="link">
              Delete
            </Button>
          )}
        </span>
      ),
    },
  ];

  const [fetchAgain, setFetchAgain] = useState(false);
  const [query, setQuery] = useState({
    search: '',
    sort: 'asce',
    page: '1',
    rows: '10',
  });

  // fetch user-list API data
  const [loading, error, response] = useFetchData(
    `/users?keyword=${query.search}&limit=${query.rows}&page=${query.page}&sort=${query.sort}`,
    fetchAgain,
  );

  // reset query options
  useEffect(() => {
    setQuery((prevState) => ({ ...prevState, page: '1' }));
  }, [query.rows, query.search]);

  // function to handle delete user
  const handleDeleteUser = (id) => {
    confirm({
      title: 'DELETE USER',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure delete this User permanently?',
      okButtonProps: {
        className: 'bg-color-primary',
      },
      onOk() {
        return new Promise((resolve, reject) => {
          ApiService.delete(`/users/${id}`)
            .then((res) => {
              if (res) {
                notificationWithIcon('success', 'SUCCESS', 'User delete successful');
                setFetchAgain(!fetchAgain);
                resolve();
              } else {
                notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
                reject();
              }
            })
            .catch((err) => {
              notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
              reject();
            });
        }).catch(() => notificationWithIcon('error', 'ERROR', 'Oops errors!'));
      },
    });
  };

  return (
    <div>
      {/* user list ― query section */}
      <QueryOptions query={query} setQuery={setQuery} />

      {/* user list ― content section */}
      <div className="w-full flex flex-row flex-wrap items-center justify-center gap-2">
        {error ? (
          <Result title="Failed to fetch" subTitle={error} status="error" />
        ) : (
          <Skeleton loading={loading} paragraph={{ rows: 10 }} active>
            {response?.data?.rows?.length === 0 ? (
              <Empty className="mt-10" description={<span>Sorry! No not found!!!</span>} />
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

      {/* user list ― pagination */}
      {response?.total_page > 1 && (
        <Pagination
          className="my-5"
          onChange={(e) => setQuery((prevState) => ({ ...prevState, page: e }))}
          total={response?.data?.total_page * 10}
          current={response?.data?.current_page}
        />
      )}
    </div>
  );
}

export default React.memo(UsersTable);
