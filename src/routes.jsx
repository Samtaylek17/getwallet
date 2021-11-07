import React, { Suspense, lazy, useAuth } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Wallet = lazy(() => import('./pages/Wallet'));
const Login = lazy(() => import('./pages/Authentication/Login'));
const FundWallet = lazy(() => import('./pages/Wallet/FundWallet'));

const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  function PrivateRoute({ children }) {
    return isAuthenticated && user ? children : <Navigate to="/login" />;
  }

  const styles = {
    margin: '20px 0',
    marginBottom: '20px',
    height: '100vh',
    padding: '20% 50%',
    textAlign: 'center',
    borderRadius: '4px',
  };

  const Spinner = () => (
    <div style={styles}>
      <Spin size="large" />
    </div>
  );

  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/wallet"
            element={
              <PrivateRoute>
                <Wallet />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/wallet/:id"
            element={
              <PrivateRoute>
                <FundWallet />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={isAuthenticated && !isEmpty(user) ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
