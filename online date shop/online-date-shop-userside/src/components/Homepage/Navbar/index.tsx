import { Avatar, Badge, Button, Drawer, Menu, MenuProps, Modal, Tag } from 'antd';
import React, { useState } from 'react';
import LoginButton from './LoginButton';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../../../store/useCartStore';
import AuthStatus from '../../../utils/authStatus';
import AuthService from '../../../service/auth.service';

const Navbar = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('home'); // Set initial value to 'home'
  const { cart } = useCartStore();
  const [isProfileInfoOpen, setIsProfileInfoOpent] = useState(false);

  const toggleProfileInfo = () => {
    setIsProfileInfoOpent((prev) => !prev);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const cartBadge = (
    <Badge count={cart.length} overflowCount={99} style={{ backgroundColor: '#52c41a' }}>
      <span className="text-black text-xl">Cart</span>
    </Badge>
  );

  const items: MenuProps['items'] = [
    {
      label: 'Home',
      key: 'home',
      onClick: () => navigate('/'),
    },
    {
      label: 'Shop',
      key: 'shop',
      onClick: () => navigate('/shop'),
    },
    {
      label: 'Collection',
      key: 'collection',
      onClick: () => navigate('/collection'),
    },
    {
      label: cartBadge,
      key: 'cart',
      onClick: () => navigate('/cart'),
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-fit py-4">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-black text-xl lg:text-4xl italic">Online Date Shop</h1>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:block">
              <Menu
                rootClassName="bg-none text-xl text-black w-[400px]"
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
              />
            </div>
            {AuthStatus.isLoggedIn() ? (
              <Avatar className="bg-orange-300 cursor-pointer mr-2" onClick={toggleProfileInfo}>
                {AuthStatus.getUserData()?.username[0]}
              </Avatar>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>

      {/* Responsive menu for small screens */}
      <div className="sm:hidden">
        <Menu
          rootClassName="bg-none text-xl text-black"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>

      <Drawer open={isProfileInfoOpen} onClose={toggleProfileInfo}>
        <Tag className="w-full text-lg text-center">{AuthStatus.getUserData()?.fullname}</Tag>
        <div className="flex flex-col gap-3 py-5">
          <Button block>
            <Link to={'/your-orders'}>Your Orders</Link>
          </Button>
          <Button block>
            <Link to={'/shop'}>Go to shopping</Link>
          </Button>
          <Button block>
            <Link to={'/collection'}>Read about the products</Link>
          </Button>
        </div>
        <Button
          block
          type="primary"
          className="!bg-red-400 font-bold text-lg uppercase h-[40px]"
          onClick={() => {
            AuthService.logout();
            toggleProfileInfo();
          }}
        >
          Logout
        </Button>
      </Drawer>
    </nav>
  );
};

export default Navbar;
