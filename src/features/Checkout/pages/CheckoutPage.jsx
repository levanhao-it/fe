import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import DeliveryOrder from "features/Delivery/components/DeliveryOrder";
import CheckoutDetail from "../components/CheckoutDetail";
import ButtonActive from "components/component-custom/ButtonActive";
import { useHistory, useRouteMatch } from "react-router-dom";
import orderApi from "api/orderApi";
import CheckoutSumary from "../components/CheckoutSumary";
import CheckoutProduct from "../components/CheckoutProduct";

CheckoutPage.propTypes = {};

function CheckoutPage(props) {
  const [order, setOrder] = useState({});
  const history = useHistory();
  const {
    params: { orderId },
  } = useRouteMatch();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await orderApi.getById(orderId);
        setOrder(data);
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
    })();
  }, [orderId]);

  const handleClick = () => {
    history.push("/products");
  };

  const handleClickOrder = () => {
    history.push("/user/order");
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <CheckoutDetail data={order} />
          <Box mt={4}>
            <ButtonActive content="View my orders" onClick={handleClickOrder} />
          </Box>

          <Box mt={4}>
            <ButtonActive content="Create new order" onClick={handleClick} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <CheckoutSumary data={order} />
          <CheckoutProduct data={order.orderItemResponseList} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutPage;
