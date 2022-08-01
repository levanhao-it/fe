import { makeStyles, Typography } from '@material-ui/core';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import userApi from 'api/userApi';

VerifyForm.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 40px',
    textAlign: 'center',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  mail: {
    margin: '10px 0 0px 0',
  },
  h4: {
    margin: '10px 0 20px 0',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '10px',
  },
  h6: {
    margin: '10px 0 20px 0',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '10px',
  },
}));

function VerifyForm(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DraftsTwoToneIcon
        fontSize="large"
        color="primary"
        className={classes.mail}
      ></DraftsTwoToneIcon>
      <Typography variant="h4" className={classes.h4}>
        You have signed up successfully!{' '}
      </Typography>
      <Typography variant="h6" className={classes.h6}>
        Please check your email to verify your account.{' '}
      </Typography>
    </div>
  );
}

export default VerifyForm;
