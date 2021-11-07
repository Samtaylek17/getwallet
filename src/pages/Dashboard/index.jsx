import React, { useState, useEffect } from 'react';
import { Layout, Card, Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Title from 'antd/lib/typography/Title';
import Sidebar from '../../components/Sidebar';
import { fetchAllWallets } from '../../slices/walletSlice';

const { Footer, Content } = Layout;

const Dashboard = () => {
  const [wallets, setWallets] = useState([]);

  const dispatch = useDispatch();

  const { walletList } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(fetchAllWallets());
    setWallets(walletList);
  }, []);
  return (
    <>
      <Layout>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar page="Dashboard" />
          <Layout>
            <Content style={{ padding: '0 50px' }}>
              <Title level={2} style={{ marginTop: '50px' }}>
                Dashboard
              </Title>

              <div className="site-card-wrapper" style={{ marginTop: '50px' }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card bordered={false}>
                      <p style={{ textAlign: 'center', fontSize: '20px' }}>Total Wallets</p>
                      <h3 style={{ textAlign: 'center', fontSize: '70px' }}>{wallets.length}</h3>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false}>
                      <p style={{ textAlign: 'center', fontSize: '20px' }}>Total Deposits</p>
                      <h3 style={{ textAlign: 'center', fontSize: '70px' }}>&#8358;0</h3>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false}>
                      <p style={{ textAlign: 'center', fontSize: '20px' }}>Total Withdraws</p>
                      <h3 style={{ textAlign: 'center', fontSize: '70px' }}>&#8358;0</h3>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Content>
            <Footer styles={{ textAlign: 'center' }}>Created by Temitayo Ogunsusi</Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
