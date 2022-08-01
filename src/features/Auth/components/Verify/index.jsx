import { makeStyles, Typography } from '@material-ui/core';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import userApi from 'api/userApi';

Verify.propTypes = {};

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

function Verify(props) {
  const classes = useStyles();
  const location = useLocation();
  const code = queryString.parse(location.search).code;
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await userApi.verify({ code: code });
        console.log(status);
        if (status === 'OK') {
          setFlag(true);
        } else {
          setFlag(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [code]);

  return (
    <div className={classes.root}>
      <DraftsTwoToneIcon
        fontSize="large"
        color="primary"
        className={classes.mail}
      ></DraftsTwoToneIcon>
      {flag ? (
        <Typography variant="h4" className={classes.h4}>
          Congratulations, your account has been verified.{' '}
        </Typography>
      ) : (
        <>
          <Typography variant="h4" className={classes.h4}>
            Sorry, we could not verify account.
          </Typography>
          <Typography variant="h4" className={classes.h4}>
            It maybe already verified, or verification code is incorrect.
          </Typography>
        </>
      )}
    </div>
  );
}

export default Verify;
