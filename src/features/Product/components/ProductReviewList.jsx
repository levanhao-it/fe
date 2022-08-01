import { Link, Dialog, DialogContent } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Alert, Rating } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import ProductReview from './ProductReview';
import { makeStyles } from '@material-ui/core/styles';
import ProductReviewForm from './ProductReviewForm';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Close } from '@material-ui/icons';
import LogIn from 'features/Auth/components/LogIn';
import Register from 'features/Auth/components/Register';
import rateApi from 'api/rateApi';
import { useSnackbar } from 'notistack';
import useProductDetail from '../hooks/useProductDetail';

ProductReviewList.propTypes = {
  product: PropTypes.object,
};

const useStyle = makeStyles((theme) => ({
  commentLink: {
    color: '#333',
    textDecoration: 'underline',
    marginTop: theme.spacing(1),
    display: 'inline-block',
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff',
      cursor: 'pointer',
    },
  },

  titleRating: {
    marginLeft: theme.spacing(1),
  },
  // dialog login
  list: {
    display: 'flex',
    listStyle: 'none',

    '& > li': {
      padding: theme.spacing(0, 2),
      fontSize: '0.8rem',
    },

    '& > li:hover': {
      color: '#757575',
      cursor: 'pointer',
    },

    '& > li ~ li': {
      borderLeft: '1px solid #000',
    },
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
}));
const MODE = {
  LOGIN: 'login',
  REGISTER: 'resgister',
};

function ProductReviewList({ product = {} }) {
  const [openReview, setOpenReview] = useState(false);
  const classes = useStyle();
  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const loggedInUser = useSelector((state) => state.user.isLoggedIn);

  const isLoggedIn = !!loggedInUser;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [rateList, setRateList] = useState([]);
  const [rateAvg, setRateAvg] = useState(product.rating ? product.rating : 0);

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

  const handleClickRegister = () => {
    setMode(MODE.REGISTER);
    handleClickOpen();
  };

  const handleOpenReview = () => {
    if (isLoggedIn) {
      setOpenReview(true);
    } else {
      setMode(MODE.LOGIN);
      handleClickOpen();
    }
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      values.productId = product.id;
      console.log(values);

      const result = await rateApi.add(values);
      if (result.status === 'OK') {
        const resultRate = await rateApi.getById(product.id);
        setRateList(resultRate.data);
        setRateAvg(resultRate.data.reduce((a, b) => a + b.rating, 0) / resultRate.data.length);
        enqueueSnackbar('Add Rate Success', { variant: 'success', autoHideDuration: 1000 });
        handleCloseReview();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await rateApi.getById(product.id);
        setRateList(result.data);
      } catch (error) {
        console.log('Failed to fetch rate', error);
      }
    })();
  }, [product.id]);

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Rating name="read-only" value={rateAvg} precision={0.5} readOnly size="medium" />
        <Typography variant="p" className={classes.titleRating}>
          {Number.isInteger(rateAvg) ? rateAvg : rateAvg.toFixed(1)} stars
        </Typography>
      </Box>

      <Link className={classes.commentLink} onClick={handleOpenReview}>
        Write a Review
      </Link>
      {rateList.length === 0 ? (
        <Box mt={2}>
          <Alert severity="warning">There are no reviews yet</Alert>
        </Box>
      ) : (
        <ProductReview product={product} rateList={rateList} />
      )}

      <Dialog open={openReview} onClose={handleCloseReview} disableEscapeKeyDown>
        <DialogContent>
          <ProductReviewForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
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
              <Register closeDialog={handleClickLogin} />
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
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ProductReviewList;
