import React from 'react';
import PropTypes from 'prop-types';
import ChangePasswordForm from '../ChangePasswordForm';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import userApi from 'api/userApi';

ChangePassword.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '90px auto',
    width: '40%',
    border: '3px solid #ccc',
    padding: '10px',
  },
}));

function ChangePassword(props) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      const { status } = await userApi.changePassword(values);
      if (status === 'OK') {
        history.push('/home');
        enqueueSnackbar('Change success', {
          variant: 'success',
          autoHideDuration: 1000,
        });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 1000,
      });
    }
  };
  return (
    <div className={classes.root}>
      <ChangePasswordForm onSubmit={handleSubmit}></ChangePasswordForm>
    </div>
  );
}

export default ChangePassword;
