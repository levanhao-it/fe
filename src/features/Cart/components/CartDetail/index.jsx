import React from "react";
import PropTypes from "prop-types";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CartList from "../CartList";
import ButtonActive from "components/component-custom/ButtonActive";
import { useSelector } from "react-redux";
import {
  cartItemsCountSelector,
  cartTotalPriceSelector,
} from "features/Cart/selector";
import { useHistory } from "react-router-dom";

CartDetail.propTypes = {
  data: PropTypes.array,
};
CartDetail.propsDefault = {
  data: [],
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px 25px",
  },
  thread: {
    borderBottom: "1px solid #e6e6e6",
    padding: "10px 10px",
  },
  box: {
    borderBottom: "1px solid #e6e6e6",
    padding: "30px 10px",
  },
  buttonCart: {
    width: "50%",
    backgroundColor: "#000",
    color: "#fff",
    height: "50px",
    fontSize: "16px",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "#000",
      color: "#ccc",
      opacity: "0.7",
      transition: "all 0.3s ease-in-out",
    },
  },
  buttonHeart: {
    width: "calc(20% - 5px)",
    marginLeft: "5px",
    height: "50px",
    border: "2px solid #000",
  },
  buttonTitle: {
    fontSize: "20px",
    fontWeight: "600",
  },
  title: {
    fontSize: "26px",
    textTransform: "uppercase",
    color: "#000",
    fontWeight: "bold",
    paddingBottom: "20px ",
  },
  titleEmpty: {
    fontSize: "36px",
    textTransform: "uppercase",
    color: "#000",
    fontWeight: "bold",
    paddingBottom: "20px ",
  },
}));

function CartDetail({ data, count }) {
  const classes = useStyles();
  const history = useHistory();
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const cartTotalPrice = useSelector(cartTotalPriceSelector);
  const handleClick = () => {
    history.push("/products");
  };
  return (
    <Box className={classes.root}>
      {cartItemsCount > 0 ? (
        <Box>
          <Typography variant="h3" className={classes.title}>
            Your Bag
          </Typography>
          <Typography variant="h6">
            {" "}
            TOTAL ({cartItemsCount} products) {cartTotalPrice}$
          </Typography>
          <CartList data={data} />
        </Box>
      ) : (
        <Box>
          <Typography variant="h3" className={classes.titleEmpty}>
            Your Bag is empty
          </Typography>
          <Typography>
            Once you add something to your bag, it will appear here. Ready to
            get started?
          </Typography>
        </Box>
      )}

      <Box mt={3}>
        <ButtonActive
          content={cartItemsCount > 0 ? "Shopping continute" : "Get started"}
          onClick={handleClick}
        />
      </Box>
    </Box>
  );
}

export default CartDetail;
