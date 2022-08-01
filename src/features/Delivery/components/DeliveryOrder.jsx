import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import OrderSumary from "components/OrderSumary";
import DeliveryOrderItem from "./DeliveryOrderItem";
import { useSelector } from "react-redux";

DeliveryOrder.propTypes = {
  data: PropTypes.object,
};

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
  },
  headingTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "24px",
  },
  containerOrder: {
    padding: "40px 0",
  },
}));

function DeliveryOrder(props) {
  const classes = useStyle();
  const orderList = useSelector((state) => state.cart.cartItems);

  return (
    <div className={classes.root}>
      <OrderSumary />
      <Box className={classes.containerOrder}>
        <Typography variant="h4" className={classes.headingTitle}>
          Order details
        </Typography>
        {orderList.map((order, index) => (
          <DeliveryOrderItem key={index} data={order} />
        ))}
      </Box>
    </div>
  );
}

export default DeliveryOrder;
