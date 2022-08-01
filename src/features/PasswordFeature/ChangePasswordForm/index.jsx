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
import ButtonSecondary from 'components/component-custom/ButtonSecondary';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object().shape({
  verificationCode: yup.string().required('Please enter verification code'),
  newPassword: yup
    .string()
    .required('Please enter password')
    .min(6, 'Title must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please enter confirm password')
    .oneOf([yup.ref('newPassword'), null], 'Password does not match'),
});

const useStyles = makeStyles((theme) => ({
  root: {
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
  boxSubmit: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function ChangePasswordForm(props) {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      verificationCode: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handelSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }

    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <Box align="center" className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.process} />}

      <Typography className={classes.title} component="h3" variant="h5">
        change information
      </Typography>

      <form onSubmit={form.handleSubmit(handelSubmit)}>
        <InputField name="verificationCode" label="Verification Code" form={form} />
        <PasswordField name="newPassword" label="Password" form={form} />
        <PasswordField name="confirmPassword" label="Confim Password" form={form} />
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
          <Box className={classes.boxSubmit}>
            <ButtonSecondary disabled={isSubmitting} content="Skip" type="" widthBtn="35%" />
            <ButtonActive disabled={isSubmitting} content="Save" type="submit" widthBtn="35%" />
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default ChangePasswordForm;
