import { Divider } from 'antd';
import DateCard from './DateCard';
import { useQuery } from 'react-query';

const ShopPage = () => {
  const { isLoading, error, data } = useQuery('shop-data', () =>
    fetch('http://localhost:3000/products/all').then((res) => res.json()),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured!!!</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">Date Shop</h1>
      <Divider />
      <div className="flex flex-wrap justify-center">
        {data &&
          data.map((date, i) => (
            <div key={i} className="m-4">
              <DateCard dateProduct={date} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShopPage;
