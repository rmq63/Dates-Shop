import { Table } from 'antd';
import PropTypes from 'prop-types'; // Import PropTypes

const ProductInfoTable = ({ data }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

ProductInfoTable.propTypes = {
  data: PropTypes.isRequired,
};

export default ProductInfoTable;
