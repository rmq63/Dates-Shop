import { Card, Result } from 'antd';
import React from 'react';
import useFetchData from '../../hooks/useFetchData';

function Dashboard() {
  // fetch dashboard API data
  const [loading, error, response] = useFetchData('/dashboard');

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 py-8">
      <h2 className="text-[20px] text-center font-text-font font-medium py-4">
        Welcome to Online Date Shop — Dashboard
      </h2>

      {error ? (
        <Result title="Failed to fetch" subTitle={error} status="error" />
      ) : (
        <div className="flex flex-wrap">
          <Card className="m-4" title="Total Users" style={{ width: 300 }}>
            <p className="text-4xl font-bold text-center text-blue-500">{response.totalUsers}</p>
          </Card>
          <Card className="m-4" title="Total Products" style={{ width: 300 }}>
            <p className="text-4xl font-bold text-center text-green-500">{response.totalProducts}</p>
          </Card>
          <Card className="m-4" title="Total Pending Orders" style={{ width: 300 }}>
            <p className="text-4xl font-bold text-center text-yellow-500">{response.totalPendingOrders}</p>
          </Card>
        </div>
      )}
    </div>
  );
}

export default React.memo(Dashboard);
