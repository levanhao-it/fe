import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";

CheckoutProduct.propTypes = {
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

  box: {
    marginTop: "15px",
  },
  imgProduct: {
    width: "90px",
    height: "90px",
  },
  title: {
    fontSize: "14px",
  },
  containerInfo: {
    paddingLeft: "15px",
  },
}));

function CheckoutProduct({ data = [] }) {
  const classes = useStyle();
  return (
    <Box className={classes.containerOrder}>
      <Typography variant="h4" className={classes.headingTitle}>
        Order details
      </Typography>
      {data.map((product, index) => (
        <div className={classes.box}>
          <Box display="flex">
            <img
              src={product.image}
              alt={product.nameProduct}
              className={classes.imgProduct}
            />

            <Box className={classes.containerInfo}>
              <Box>
                <Typography variant="p" className={classes.title}>
                  {product.nameProduct}
                </Typography>
              </Box>

              <Box>
                <Typography variant="p" className={classes.title}>
                  {" "}
                  COLOR: <Typography variant="p">{product.color} </Typography>
                </Typography>
              </Box>

              <Box>
                <Typography variant="p" className={classes.title}>
                  {" "}
                  SIZE: <Typography variant="p">{product.size}</Typography>/
                  Quanlity:{" "}
                  <Typography variant="p">{product.quantity}</Typography>
                </Typography>
              </Box>

              <Box>
                <Typography variant="p" className={classes.title}>
                  ${product.salePrice}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      ))}
    </Box>
  );
}

export default CheckoutProduct;
