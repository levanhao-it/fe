import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddressList from './components/AddressList';
import { Helmet } from 'react-helmet-async';

AddressFeauture.propTypes = {};

function AddressFeauture(props) {
  const match = useRouteMatch();
  return (
    <Box>
      <Helmet>
        <title>My Address</title>
      </Helmet>
      <Switch>
        <Route path={match.url} exact component={AddressList} />
      </Switch>
    </Box>
  );
}

export default AddressFeauture;
