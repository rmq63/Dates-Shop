import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/Login';
import Layout from './pages/Layout';
import RegistrationPage from './pages/RegistrationPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CollectionPage from './pages/CollectionPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/your-orders" element={<Orders />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
