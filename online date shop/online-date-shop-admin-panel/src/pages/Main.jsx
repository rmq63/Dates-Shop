import {
  DashboardOutlined,
  FileProtectOutlined,
  ProductOutlined,
  LogoutOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {  Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Dashboard from '../components/tabs/Dashboard';
import Orders from '../components/tabs/Orders';
import Users from '../components/tabs/Users';
import { removeSessionAndLogoutUser } from '../utils/authentication';
import notificationWithIcon from '../utils/notification';
import '../index.css';
import Logo from '../components/Logo';
import Products from '../components/tabs/Products';

const { Header, Content, Footer, Sider } = Layout;

function Main() {
  window.document.title = 'Online Date Shop — Main';
  const [selectedKeys, setSelectedKeys] = useState('1');
  const navigate = useNavigate();
  const { tab } = useParams();

  // function to handle user logout
  const userLogout = async () => {
    try {
      removeSessionAndLogoutUser();
      navigate('/auth/login');
    } catch (error) {
      notificationWithIcon(
        'error',
        'ERROR',
        error?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error',
      );
    }
  };

  const handleTabChange = (key) => {
    switch (key) {
      case '1': {
        navigate('/main/dashboard');
        break;
      }
      case '2': {
        navigate('/main/users');
        break;
      }
      case '3': {
        navigate('/main/products');
        break;
      }
      case '4': {
        navigate('/main/orders');
        break;
      }
      case '5': {
        userLogout();
        break;
      }
      default: {
        navigate('/main/dashboard');
      }
    }
  };

  useEffect(() => {
    if (tab) {
      switch (tab) {
        case 'dashboard': {
          setSelectedKeys('1');
          break;
        }
        case 'users': {
          setSelectedKeys('2');
          break;
        }
        case 'products': {
          setSelectedKeys('3');
          break;
        }
        case 'orders': {
          setSelectedKeys('4');
          break;
        }
        case 'logout': {
          setSelectedKeys('5');
          break;
        }
        default: {
          navigate('/not-found');
        }
      }
    }
  }, [tab, navigate]);

  useEffect(() => {
    switch (selectedKeys) {
      case '1': {
        window.document.title = 'Online Date Shop — Dashboard';
        break;
      }
      case '2': {
        window.document.title = 'Online Date Shop — Users';
        break;
      }
      case '3': {
        window.document.title = 'Online Date Shop — Products';
        break;
      }
      case '4': {
        window.document.title = 'Online Date Shop — Booking Orders';
        break;
      }
      case '5': {
        window.document.title = 'Online Date Shop — Logout';
        break;
      }
      default: {
        window.document.title = 'Online Date Shop — Dashboard';
      }
    }
  }, [selectedKeys]);

  return (
    <Layout className="w-full h-screen">
      <Sider width={250} breakpoint="lg" collapsedWidth="0">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKeys]}
          onClick={(e) => {
            handleTabChange(e.key);
          }}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <TeamOutlined />,
              label: 'User Management',
            },
            {
              key: '3',
              icon: <ProductOutlined />,
              label: 'Product Management',
            },
            {
              key: '4',
              icon: <FileProtectOutlined />,
              label: 'Order Management',
            },
            {
              key: '5',
              icon: <LogoutOutlined />,
              label: 'Logout',
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header className="p-0 !bg-bg-white">
          <Link to="/">
            <Logo />
          </Link>
        </Header>

        <Content className="bg-bg-white overflow-y-scroll m-2 p-2">
          {selectedKeys === '1' && <Dashboard />}
          {selectedKeys === '2' && <Users />}
          {selectedKeys === '3' && <Products />}
          {selectedKeys === '4' && <Orders />}
        </Content>

        <Footer className="text-center font-bold text-gray-700 bg-gray-200 py-6">
          Crafted with ❤️ by Online Date Shop Team
        </Footer>
      </Layout>
    </Layout>
  );
}

export default React.memo(Main);
