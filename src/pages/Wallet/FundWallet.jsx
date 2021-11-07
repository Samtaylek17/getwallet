import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Modal, Button, Table, Input, Form, Card } from 'antd';
import Title from 'antd/lib/typography/Title';
import Sidebar from '../../components/Sidebar';
import columns from './column';
import { fetchSingleWallet, createWalletAction } from '../../slices/walletSlice';

const FundWallet = () => {
  const [walletData, setWalletData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [email, setEmail] = useState('');

  const { id } = useParams();

  const dispatch = useDispatch();
  const { Content } = Layout;

  const { wallet, error: walletError } = useSelector((state) => state.wallet);

  const fetchWallets = () => {
    dispatch(fetchSingleWallet(id));
    setWalletData(wallet);
  };

  useEffect(() => {
    fetchWallets();
  }, []);

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
                  Fund Wallet
                </Button>
                <Modal
                  title="Create Wallet"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={handleOk}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </Col>
            </Row>
            <div className="site-card-wrapper" style={{ marginTop: '50px' }}>
              <Card title={wallet.wallet_id} bordered={false} style={{ width: 300 }}>
                <p>Email: {wallet.customer_email}</p>
                <p>Status: {wallet.status}</p>
                <p>Currency: {wallet.currency}</p>
                <p>Balance: {wallet.balance}</p>
              </Card>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default FundWallet;
