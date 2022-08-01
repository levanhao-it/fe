import React from 'react';
import PropTypes from 'prop-types';
import EmailForm from './EmailForm';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';

PasswordFeature.propTypes = {};

function PasswordFeature(props) {
  const match = useRouteMatch();

  return (
    <div>
      <Box>
        <Switch>
          <Route path={`${match.url}`} exact component={ForgotPassword} />

          <Route path={`${match.url}/change-password`} exact component={ChangePassword} />
        </Switch>
      </Box>
    </div>
  );
}

export default PasswordFeature;
