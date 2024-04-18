import React, { useState } from 'react';
import { Radio, Tabs, Card, Typography } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import dateData from './dateDetails.json';

const { TabPane } = Tabs;

const CollectionPage: React.FC = () => {
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('small');

  const onChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  return (
    <div>
      <Radio.Group value={size} onChange={onChange} style={{ marginBottom: 16 }}>
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="middle">Middle</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
      <Tabs defaultActiveKey="1" tabPosition="left" size={size} style={{ marginBottom: 32 }}>
        {dateData.map((date, index) => (
          <TabPane tab={date.name} key={index + 1}>
            <Card style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
              <img
                alt={date.name}
                src={date.image}
                style={{ height: '200px', objectFit: 'cover', marginBottom: '16px' }}
              />
              <div>
                <Typography.Title level={2}>{date.name}</Typography.Title>
                <p>{date.description}</p>
              </div>
            </Card>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default CollectionPage;
