import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLoginButtonClicked = () => {
    navigate('/login');
  };

  return (
    <Button
      type="primary"
      shape="round"
      size="large"
      className="bg-black text-white font-bold h-10 text-xl"
      style={{
        height: 50,
        width: 150,
      }}
      onClick={handleLoginButtonClicked}
    >
      Login
    </Button>
  );
};

export default LoginButton;
