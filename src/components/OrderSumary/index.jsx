import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  cartItemsCountSelector,
  cartTotalPriceSelector,
} from "features/Cart/selector";

OrderSumary.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    border: "1px solid #ccc",
    padding: theme.spacing(2),
  },
  headingTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "24px",
  },
  title: {
    textTransform: "uppercase",
    fontSize: "14px",
  },
  titleActive: {
    textTransform: "uppercase",
    fontSize: "14px",
    fontWeight: "bold",
  },
}));

function OrderSumary(props) {
  const classes = useStyle();
  const voucher = useSelector((state) => state.voucher);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const cartTotalPrice = useSelector(cartTotalPriceSelector);
  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography variant="h4" className={classes.headingTitle}>
          Order summary
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="p" className={classes.title}>
            {cartItemsCount} Item
          </Typography>
          <Typography variant="p" className={classes.title}>
            ${cartTotalPrice}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="p" className={classes.title}>
            Sale
          </Typography>
          <Typography variant="p" className={classes.title}>
            - {(voucher.discount || 0) > 0 && `$${voucher.discount}`}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="p" className={classes.title}>
            Delivery
          </Typography>
          <Typography variant="p" className={classes.title}>
            Free
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="p" className={classes.titleActive}>
            Total
          </Typography>
          <Typography variant="p" className={classes.titleActive}>
            ${cartTotalPrice - (voucher.discount || 0)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default OrderSumary;
