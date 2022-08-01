import { yupResolver } from '@hookform/resolvers/yup';
import { Box, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import ButtonActive from 'components/component-custom/ButtonActive';
import InputField from 'components/form-controls/InputField';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

EmailForm.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object().shape({
  email: yup.string().required('Please enter email').email('Please enter valid email'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '350px',
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

function EmailForm(props) {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handelSubmit = async (values) => {
    console.log(values);
    const { onSubmit } = props;
    console.log(props);
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
        Forgot your account
      </Typography>
      <Typography className={classes.slogan}>Please enter your email</Typography>

      <form onSubmit={form.handleSubmit(handelSubmit)}>
        <InputField name="email" label="Email" form={form} />
        <Box>
          <ButtonActive disabled={isSubmitting} content="Continues" type="submit" />
        </Box>
      </form>
    </Box>
  );
}

export default EmailForm;
