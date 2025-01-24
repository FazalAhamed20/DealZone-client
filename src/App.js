
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import AuthPage from './pages/AuthPage';
import ProductPage from './pages/ProductPage';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import MyProductsPage from './pages/MyProductsPage';
import RequestStatusPage from './pages/RequestStatusPage';
import LoginPage from './pages/LoginPage';




function App() {
  const appRoutes = createBrowserRouter([{
    path: "/",
    element: <PublicRoute><AuthPage /></PublicRoute>
  },
  {
    path: "/login",
    element: <PublicRoute><LoginPage /></PublicRoute>
  },
  {
    path: "/products",
    element: <ProtectedRoute><ProductPage /></ProtectedRoute>
  },
  {
    path: "/myproducts",
    element: <ProtectedRoute><MyProductsPage /></ProtectedRoute>
  },{
    path: "/request_status",
    element:<ProtectedRoute><RequestStatusPage/></ProtectedRoute>
  }
  ])
  return (
    <div>

      <RouterProvider router={appRoutes} />



    </div>
  );
}

export default App;
