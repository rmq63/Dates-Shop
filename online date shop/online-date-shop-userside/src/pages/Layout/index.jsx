import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Homepage/Navbar';

const Layout = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
