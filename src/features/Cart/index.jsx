import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import ButtonActive from 'components/component-custom/ButtonActive';
import OrderSumary from 'components/OrderSumary';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CartDetail from './components/CartDetail';
import CartSummary from './components/CartSummary';
import CartVoucher from './components/CartVoucher';
import { cartItemsCountSelector } from './selector';

CartFeature.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '70px 0',
  },
  btn: {
    marginBottom: theme.spacing(4),
  },
}));

function CartFeature(props) {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const history = useHistory();
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const handleCheckout = () => {
    history.push('/delivery');
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <CartDetail data={cartItems} />
          </Grid>

          {cartItemsCount > 0 && (
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Box className={classes.btn}>
                <ButtonActive content="Checkout" onClick={handleCheckout} />
              </Box>
              <OrderSumary />
              <CartVoucher />
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default CartFeature;
