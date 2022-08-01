import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import ButtonActive from 'components/component-custom/ButtonActive';
import ButtonSecondary from 'components/component-custom/ButtonSecondary';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';

UserDetailForm.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object().shape({
  firstName: yup.string().required('Please enter first name'),
  lastName: yup.string().required('Please enter last name'),
});

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'left',
    margin: '8px 0 16px',
    textTransform: 'uppercase',
    fontSize: '26px',
    fontWeight: '750',
  },
  title: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: '18px',
    fontWeight: '700',
    marginTop: '16px',
  },
}));

function UserDetailForm(props) {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      dateBirth: '',
      monthBirth: '',
      yearBirth: '',
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
        Edit your details
      </Typography>

      <form onSubmit={form.handleSubmit(handelSubmit)}>
        <InputField name="firstName" label="First Name *" form={form} />
        <InputField name="lastName" label="Last Name *" form={form} />

        {/* <Typography component="p" variant='p' className={classes.title}>Date of Birth</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <InputField name="monthBirth" label="MM *" form={form} />
          </Grid>

          <Grid item xs={4}>
            <InputField name="dateBirth" label="DD *" form={form} />
          </Grid>

          <Grid item xs={4}>
            <InputField name="yearBirth" label="YYYY *" form={form} />
          </Grid>
        </Grid> */}

        <ButtonActive content="Update details" type="submit" />
        <ButtonSecondary content="Cancel" />
      </form>
    </Box>
  );
}

export default UserDetailForm;
