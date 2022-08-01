import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";

DeliveryOrderItem.propTypes = {
  data: PropTypes.object,
};

const useStyle = makeStyles((theme) => ({
  root: {
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

function DeliveryOrderItem({ data }) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Box display="flex">
        <img
          src={data.productDetail.linkImg}
          alt={data.product.name}
          className={classes.imgProduct}
        />

        <Box className={classes.containerInfo}>
          <Box>
            <Typography variant="p" className={classes.title}>
              {data.product.name}
            </Typography>
          </Box>

          <Box>
            <Typography variant="p" className={classes.title}>
              {" "}
              COLOR:{" "}
              <Typography variant="p">{data.productDetail.color} </Typography>
            </Typography>
          </Box>

          <Box>
            <Typography variant="p" className={classes.title}>
              {" "}
              SIZE:{" "}
              <Typography variant="p">{data.productDetail.size}</Typography>/
              Quanlity: <Typography variant="p">{data.quantity}</Typography>
            </Typography>
          </Box>

          <Box>
            <Typography variant="p" className={classes.title}>
              ${data.productDetail.salePrice}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default DeliveryOrderItem;
