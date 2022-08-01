import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

PrivateRoute.propTypes = {};

function PrivateRoute({ component: Component, ...rest }) {
  const loggedInUser = useSelector((state) => state.user.isLoggedIn);

  const isLoggedIn = !!loggedInUser;
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        );
      }}
    />
  );
}

export default PrivateRoute;
