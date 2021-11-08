import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Wallet = lazy(() => import('./pages/Wallet'));
const Login = lazy(() => import('./pages/Authentication/Login'));
const FundWallet = lazy(() => import('./pages/Wallet/FundWallet'));

const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated && user ? (
            <Component />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
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
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/wallet" component={Wallet} />
          <PrivateRoute exact path="/wallet/:id" component={FundWallet} />
          <Route
            exact
            path="/login"
            render={() => (isAuthenticated && !isEmpty(user) ? <Redirect to="/" /> : <Login />)}
          />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
