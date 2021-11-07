import React from 'react';
import { Layout, Menu, Divider } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { logout } from '../../slices/authSlice';

const Sidebar = ({ page }) => {
  const { Sider } = Layout;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Sider style={{ padding: '40px 0', background: '#0079ff' }} width={250}>
      <Title style={{ color: '#fff', textAlign: 'center' }} level={3}>
        Teamify
      </Title>
      <Divider style={{ background: '#fff' }} />
      <Menu defaultSelectedKeys={[page]} style={{ background: '#0079ff', color: '#fff' }}>
        <Menu.Item key="Dashboard" style={{ margin: '20px 0', paddingLeft: '30px' }}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="Wallet" style={{ margin: '20px 0', paddingLeft: '30px' }}>
          <Link to="/wallet">Wallet</Link>
        </Menu.Item>

        <Menu.Item
          key="Logout"
          style={{ margin: '30vh 0', paddingLeft: '30px' }}
          onClick={handleLogout}
        >
          Logout <LogoutOutlined />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
