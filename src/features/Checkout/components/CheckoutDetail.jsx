import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import moment from 'moment';

CheckoutDetail.propTypes = {
  data: PropTypes.object,
};

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },

  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  numberId: {
    marginLeft: theme.spacing(1),
    textDecoration: 'underline',
  },
  boxOrder: {
    marginTop: theme.spacing(4),
    backgroundColor: '#ececec',
    padding: theme.spacing(2),
    borderRadius: '4px',
  },

  boxDetail: {
    backgroundColor: '#fff',
    padding: theme.spacing(2),
  },

  titleOrder: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  titleInfo: {
    fontWeight: 'bold',
  },

  boxInfo: {
    marginTop: theme.spacing(2),
  },
}));

function CheckoutDetail({ data }) {
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <Box>
        <Typography component="h2" variant="h5" className={classes.heading} gutterBottom>
          Your order was placed successfully
        </Typography>
        <Typography component="p" gutterBottom>
          Order Number:
          <Typography component="span" className={classes.numberId}>
            {data.id}
          </Typography>
        </Typography>

        <Typography gutterBottom>
          Hi {data.nameDelivery}, thanks for shopping with adidas! We will send a confirmation email
          to your email. Please confirm your order
        </Typography>
      </Box>

      <Box className={classes.boxOrder}>
        <Typography className={classes.titleOrder}>Order Information</Typography>
        <Box className={classes.boxDetail}>
          <Box>
            <Typography component="span" className={classes.titleInfo}>
              Order Number:{' '}
            </Typography>
            <Typography component="span">{data.id}</Typography>
          </Box>

          <Divider />
          <Box mt={2}>
            <Typography className={classes.titleInfo}>Shipping address</Typography>
            <Typography>{data.nameDelivery}</Typography>
            <Typography>{data.addressDelivery}</Typography>
            <Typography>{data.phoneDelivery}</Typography>
          </Box>

          <Divider />
          <Box mt={2}>
            <Typography className={classes.titleInfo} component="span">
              Delivery Option:{' '}
            </Typography>
            <Typography component="span">{data.nameOptionalDelivery}</Typography>
          </Box>
          <Divider />
          <Box mt={2}>
            <Typography className={classes.titleInfo} component="span">
              Delivery date:{' '}
            </Typography>
            <Typography component={'span'}> {moment(data.createDate).format('LLLL')}</Typography>
          </Box>
          <Divider />
          <Box mt={2}>
            <Typography className={classes.titleInfo} component="span">
              Payment method:{' '}
            </Typography>
            <Typography component="span">Ship code</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CheckoutDetail;
