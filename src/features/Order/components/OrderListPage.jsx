import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import OrderDetail from "./OrderDetail";
import orderApi from "api/orderApi";
import StorageKeys from "constant/storage-keys";
import ButtonActive from "components/component-custom/ButtonActive";
import { useHistory } from "react-router-dom";

OrderListPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "32px 16px",
  },
  heading: {
    textTransform: "uppercase",
    marginBottom: "8px",
    fontWeight: "bold",
    fontSize: "30px",
  },
  box: {
    minHeight: "300px",
  },
}));

function OrderListPage(props) {
  const classes = useStyle();
  const [orderList, setOrderList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const email =
          JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "";
        const { data } = await orderApi.getAll({ email });
        setOrderList(data);
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
    })();
  }, []);

  const handleClick = () => {
    history.push("/products");
  };

  return (
    <Paper variant="0">
      <Box className={classes.root}>
        <Typography component="h2" variant="h5" className={classes.heading}>
          My orders
        </Typography>
        {orderList.length === 0 ? (
          <Box className={classes.box}>
            <Typography>
              You haven't created any orders to your orders yet. Start shopping
              and create my orders right now.
            </Typography>
            <Box mt={4}>
              <ButtonActive
                content="Create new order"
                widthBtn="300px"
                onClick={handleClick}
              />
            </Box>
          </Box>
        ) : (
          <Box>
            {orderList.map((order) => (
              <OrderDetail data={order} />
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default OrderListPage;
