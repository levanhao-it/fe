import { Box, Dialog, DialogContent, makeStyles, Typography } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Close } from '@material-ui/icons';
import LogIn from 'features/Auth/components/LogIn';
import Register from 'features/Auth/components/Register';
import VerifyForm from 'features/Auth/components/VerifyForm';
import { useState } from 'react';

NoLogin.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '90px',
    paddingBottom: '90px',
    textAlign: 'center',
  },
  openLogin: {
    textDecoration: 'underline',
    color: '#00bcd4',
    cursor: 'pointer',
    marginTop: '20px',
  },
  dialog: {
    fontSize: '1.6rem',
    minWidth: '300px',
    position: 'relative',
  },
  icon: {
    float: 'right',
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    fontSize: '30px',
  },
  footerForm: {
    justifyContent: 'center',
    margin: '10px 0 20px',
  },
  footerTitle: {
    color: '#8d8d8d',
  },
  footerLink: {
    marginLeft: '4px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  menu: {
    paddingTop: '40px',
  },
  avatar: {
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    color: '#fff',
    backgroundColor: deepOrange[500],
    '&:hover': {
      cursor: 'pointer',
    },
  },
  verifyLink: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'resgister',
  VERIFY: 'verify',
};

function NoLogin(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickLogin = () => {
    setMode(MODE.LOGIN);
    handleClickOpen();
  };

  const handleClickVerify = () => {
    setMode(MODE.VERIFY);
    handleClickOpen();
  };
  return (
    <div className={classes.root}>
      <h2 className={classes.title}> Please login to perform this action </h2>
      <p className={classes.openLogin} onClick={handleClickLogin}>
        Login here
      </p>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <Close className={classes.icon} onClick={handleClose}></Close>
        <DialogContent>
          {mode === MODE.LOGIN && (
            <>
              <LogIn closeDialog={handleClose} />
              <Box display="flex" className={classes.footerForm}>
                <Typography variant="p" component="p" className={classes.footerTitle}>
                  Not a member?{' '}
                </Typography>
                <Typography
                  variant="span"
                  component="span"
                  className={classes.footerLink}
                  onClick={() => setMode(MODE.REGISTER)}
                >
                  Join Us
                </Typography>
              </Box>
            </>
          )}

          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClickVerify} />
              <Box display="flex" className={classes.footerForm}>
                <Typography variant="p" component="p" className={classes.footerTitle}>
                  Already a member?{' '}
                </Typography>
                <Typography
                  variant="span"
                  component="span"
                  className={classes.footerLink}
                  onClick={() => setMode(MODE.LOGIN)}
                >
                  Sign In
                </Typography>
              </Box>
            </>
          )}
          {mode === MODE.VERIFY && (
            <>
              <VerifyForm />

              <Box display="flex" className={classes.footerForm}>
                <h4 onClick={() => setMode(MODE.LOGIN)} className={classes.verifyLink}>
                  Click here to Login
                </h4>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NoLogin;
