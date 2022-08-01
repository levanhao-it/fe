import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ButtonActive from 'components/component-custom/ButtonActive';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
import './styles.scss';

LogInForm.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object().shape({
  email: yup.string().required('Please enter email').email('Please enter valid email'),
  password: yup
    .string()
    .required('Please enter password')
    .min(6, 'Title must be at least 6 characters'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '350px',
    padding: '10px 40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  submit: {
    backgroundColor: '#2AC37D',
    fontSize: '14px',
  },
  img: {
    width: '100px',
  },
  link: {
    fontSize: '12px',
    color: '#8d8d8d',
    textDecoration: 'underline',
  },
  slogan: {
    margin: '10px 0 20px 0',
  },
  process: {
    left: '-65px',
    top: '-18px',
    width: '479px',
  },
}));

function LogInForm(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handelSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      values.remember = checked;
      await onSubmit(values);
    }

    form.reset();
  };

  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };

  const { isSubmitting } = form.formState;

  return (
    <Box align="center" className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.process} />}

      <Typography className={classes.title} component="h3" variant="h5">
        Sign In
      </Typography>
      <Typography className={classes.slogan}>Your account for everything shoes</Typography>

      <form onSubmit={form.handleSubmit(handelSubmit)}>
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Box justifyContent={'space-between'} alignItems={'center'} display="flex">
          <FormControlLabel
            control={<Checkbox defaultChecked onChange={handleChangeChecked} checked={checked} />}
            label="Keep me signed in"
          />
          <Link href="/forgot-password" underline="none" className={classes.link}>
            Forgotten your password?
          </Link>
        </Box>

        <Box>
          <Typography>
            <Box sx={{ fontFamily: 'default', m: 1, fontSize: 12 }}>
              By logging in, you agree to our{' '}
              <Link href="#" className={classes.link}>
                {' '}
                Privacy Policy{' '}
              </Link>{' '}
              and{' '}
              <Link href="#" className={classes.link}>
                {' '}
                Terms of Use{' '}
              </Link>{' '}
            </Box>
          </Typography>

          <ButtonActive disabled={isSubmitting} content="sign in" type="submit" />
        </Box>
      </form>
    </Box>
  );
}

export default LogInForm;
