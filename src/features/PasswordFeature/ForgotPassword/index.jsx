import { makeStyles } from '@material-ui/core';
import userApi from 'api/userApi';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import EmailForm from '../EmailForm';

ForgotPassword.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '90px auto',
    width: '40%',
    border: '3px solid #ccc',
    padding: '10px',
  },
}));

function ForgotPassword(props) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const { status } = await userApi.forgotPassword(values);
      if (status === 'OK') {
        history.push('/forgot-password/change-password');
        enqueueSnackbar('Please check email to get verifycation code', {
          variant: 'success',
          autoHideDuration: 3000,
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
      <EmailForm onSubmit={handleSubmit} />
    </div>
  );
}

export default ForgotPassword;
