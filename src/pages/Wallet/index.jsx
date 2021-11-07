/* eslint-disable no-unused-labels */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Row, Col, Modal, Button, Table, Input, Form } from 'antd';
import Title from 'antd/lib/typography/Title';
import Sidebar from '../../components/Sidebar';
import columns from './column';
import { fetchAllWallets, createWalletAction } from '../../slices/walletSlice';

const Wallet = () => {
  const [wallets, setWallets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Content } = Layout;

  const { walletList, error: walletError } = useSelector((state) => state.wallet);

  const fetchWallets = () => {
    dispatch(fetchAllWallets());
    setWallets(walletList);
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const viewWallet = (walletId) => {
    navigate(`/wallet/${walletId}`);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    dispatch(createWalletAction({ email }));
    setConfirmLoading(true);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (walletError) {
      const errors = Object.entries(walletError).map(([key, val]) => ({
        name: key,
        value: form.getFieldValue(key),
        errors: val,
      }));
      form.setFields(errors);
    }
  }, [form, walletError]);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar page="Wallet" />
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            <Row style={{ marginTop: '50px' }}>
              <Col span={8}>
                <Title level={2}>Wallet</Title>
              </Col>
              <Col span={8} offset={8} style={{ textAlign: 'right' }}>
                <Button type="primary" size="large" onClick={showModal}>
                  Create New Wallet
                </Button>
                <Modal
                  title="Create Wallet"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Form form={form} layout="vertical" onFinish={handleOk}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!',
                        },
                      ]}
                    >
                      <Input
                        name="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
              </Col>
            </Row>
            <div className="site-card-wrapper" style={{ marginTop: '50px' }}>
              <Table
                columns={columns}
                dataSource={wallets}
                onRow={(record, rowIndex) => ({
                  onClick: (event) => {
                    // eslint-disable-next-line no-unused-expressions
                    viewWallet(record.wallet_id);
                  },
                })}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Wallet;
