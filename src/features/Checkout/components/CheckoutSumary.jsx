import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";

CheckoutSumary.propTypes = {};

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

function CheckoutSumary({ data }) {
  console.log(data);
  const classes = useStyle();
  return (
    <div>
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Typography variant="h4" className={classes.headingTitle}>
            Order summary
          </Typography>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="p" className={classes.title}>
              Quantity
            </Typography>
            <Typography variant="p" className={classes.title}>
              {data.quantityItem} item(s)
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="p" className={classes.title}>
              Sub Total
            </Typography>
            <Typography variant="p" className={classes.title}>
              ${data.subtotal}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="p" className={classes.title}>
              Sale
            </Typography>
            <Typography variant="p" className={classes.title}>
              {data.feeVoucher === 0 ? "-" : "- $" + data.feeVoucher}
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
              ${data.total}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default CheckoutSumary;
