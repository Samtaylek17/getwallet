import React from 'react';
import { Tag, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <>
        <Tag>{status.toUpperCase()}</Tag>
      </>
    ),
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
  },
  {
    title: 'Wallet ID',
    dataIndex: 'wallet_id',
    key: 'wallet_id',
  },
  {
    title: 'Customer Email',
    dataIndex: 'customer_email',
    key: 'customer_email',
  },
  {
    title: 'Date Created',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Actions',
    key: 'action',
    render: () => (
      <Space size="middle">
        <EditOutlined />
      </Space>
    ),
  },
];

export default columns;
