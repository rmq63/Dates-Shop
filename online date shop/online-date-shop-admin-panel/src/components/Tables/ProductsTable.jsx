import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Empty, Modal, Pagination, Result, Skeleton, Tag, Table, Image, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import useFetchData from '../../hooks/useFetchData';
import ApiService from '../../utils/apiService';
import notificationWithIcon from '../../utils/notification';
import QueryOptions from '../shared/QueryOptions';

const { confirm } = Modal;

function ProductsTable() {
  const [itemsInStock, setItemsInStock] = useState();

  const handleStockChange = (e) => {
    setItemsInStock(e.target.value);
  };

  const handleUpdateStock = async (id) => {
    try {
      await ApiService.patch(`/products/${id}`, { itemsRemaining: itemsInStock });
      notificationWithIcon('success', 'SUCCESS', 'Inventory updated successfully');
    } catch (error) {
      notificationWithIcon('error', 'ERROR', 'An error occured');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image src={image} alt="Product" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'In Stock',
      dataIndex: 'itemsRemaining',
      key: 'itemsRemaining',
      render: (itemsRemaining, record) => {
        return (
          <div className="w-[100px] flex flex-col items-center gap-3">
            <Input
              className="w-full"
              type="number"
              placeholder="items in stock"
              defaultValue={itemsRemaining}
              value={itemsInStock}
              onChange={handleStockChange}
            />
            <Button type="primary" ghost onClick={() => handleUpdateStock(record._id)}>
              Update Stock
            </Button>
          </div>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <span className="!px-0 text-center">
          <Button
            className="inline-flex items-center !px-2"
            onClick={() => handleDeleteProduct(record._id)}
            type="link"
          >
            delete
          </Button>
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

  // fetch products API data
  const [loading, error, response] = useFetchData(
    `/products?keyword=${query.search}&limit=${query.rows}&page=${query.page}&sort=${query.sort}`,
    fetchAgain,
  );

  // reset query options
  useEffect(() => {
    setQuery((prevState) => ({ ...prevState, page: '1' }));
  }, [query.rows, query.search]);

  // function to handle delete product
  const handleDeleteProduct = (id) => {
    confirm({
      title: 'DELETE PRODUCT',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure delete this Product permanently?',
      okButtonProps: {
        className: 'bg-color-primary',
      },
      onOk() {
        return new Promise((resolve, reject) => {
          ApiService.delete(`/products/${id}`)
            .then((res) => {
              if (res) {
                notificationWithIcon('success', 'SUCCESS', 'Product delete successful');
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
      {/* Product list ― query section */}
      <QueryOptions query={query} setQuery={setQuery} />

      {/* Product list ― content section */}
      <div className="w-full flex flex-row flex-wrap items-center justify-center gap-2">
        {error ? (
          <Result title="Failed to fetch" subTitle={error} status="error" />
        ) : (
          <Skeleton loading={loading} paragraph={{ rows: 10 }} active>
            {response?.length === 0 ? (
              <Empty className="mt-10" description={<span>Sorry! No products found!!!</span>} />
            ) : (
              <Table
                className="w-screen my-5"
                columns={columns}
                dataSource={response}
                pagination={false}
                rowKey={(record) => record._id || uniqueId()}
              />
            )}
          </Skeleton>
        )}
      </div>

      {/* Product list ― pagination */}
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

export default React.memo(ProductsTable);
