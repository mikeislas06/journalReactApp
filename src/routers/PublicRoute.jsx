import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

const PublicRoute = ({ isLoggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isLoggedIn ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

PublicRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default PublicRoute;
