import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to='/auth/login' />
      }
    />
  );
};

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default PrivateRoute;
