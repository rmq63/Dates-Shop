import { Navigate } from 'react-router-dom';
import { getSessionToken, getSessionUser } from '../../utils/authentication';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const user = getSessionUser();
  const token = getSessionToken();

  if (!user && !token) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}

export default PrivateRoute;
