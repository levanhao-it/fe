import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, makeStyles,
  Typography
} from '@material-ui/core';
import ButtonActive from 'components/component-custom/ButtonActive';
import ButtonSecondary from 'components/component-custom/ButtonSecondary';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

UserPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Please enter password')
    .min(6, 'Title must be at least 6 characters'),
  newPassword: yup
  .string()
  .required('Please enter password')
  .min(6, 'Title must be at least 6 characters'),
  
});

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'left',
    margin: '8px 0 16px',
    textTransform: 'uppercase',
    fontSize: '26px',
    fontWeight: '750',
    width: '550px'
  },
  title: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: '18px',
    fontWeight: '700',
    marginTop: '16px',
  },
  containerBtn: {
    width: "100%",
    float: 'left'
  }
}));

function UserPasswordForm(props) {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handelSubmit = (values) => {
    const { onSubmit } = props;
    console.log(values);
    if (onSubmit) {
      onSubmit(values);
    }

    form.reset();
  };

  return (
    <Box align="center" className={classes.root}>
      <Typography className={classes.heading} component="h3" variant="h5">
        Edit your password
      </Typography>

      <form onSubmit={form.handleSubmit(handelSubmit)}>
        <PasswordField name="oldPassword" label="Old Password *" form={form} />
        <PasswordField name="newPassword" label="New Password *" form={form} />

        <Box className={classes.containerBtn}>
          <ButtonActive content="Save Changes" type="submit"/>
          <ButtonSecondary content="Cancel"/>

        </Box>

  
      </form>
    </Box>
  );
}

export default UserPasswordForm;
