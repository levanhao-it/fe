import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import OrderListPage from './components/OrderListPage';
import { Helmet } from 'react-helmet-async';

OrderFeauture.propTypes = {};

function OrderFeauture(props) {
  const match = useRouteMatch();
  return (
    <Box>
      <Helmet>
        <title>My Orders</title>
      </Helmet>
      <Switch>
        <Route path={match.url} exact component={OrderListPage} />
      </Switch>
    </Box>
  );
}

export default OrderFeauture;
