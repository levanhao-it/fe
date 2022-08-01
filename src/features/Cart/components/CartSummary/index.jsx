import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import "./styles.scss";
import CodeIcon from "@material-ui/icons/Code";
import { Grid } from "@material-ui/core";
import ButtonActive from "../../../../components/component-custom/ButtonActive";

CartSummary.propTypes = {};

const useStyles = makeStyles((theme) => ({
  buttonCart: {
    width: "100%",
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
    fontSize: "16px",
    fontWeight: "600",
  },
  box: {
    border: "1px solid #e9ecef",
    marginTop: "30px",
    padding: "2.4rem 1.5rem",
  },
  headingTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
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
  h4: {
    fontSize: "16px",
    lineHeight: "20px",
    textTransform: "uppercase",
    fontWeight: "600",
    marginTop: "1rem",
  },
  icon: {
    fontSize: "47px",
  },
}));

function CartSummary(props) {
  const classes = useStyles();

  return (
    <Box className="summary">
      <Box className={classes.box}>
        <Typography variant="h4" className={classes.headingTitle}>
          Order summary
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="p" className={classes.title}>
            Orginal price
          </Typography>
          <Typography variant="p" className={classes.title}>
            $310.00
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="p" className={classes.title}>
            Sale
          </Typography>
          <Typography variant="p" className={classes.title}>
            - $48.00
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="p" className={classes.title}>
            2 items
          </Typography>
          <Typography variant="p" className={classes.title}>
            $262.00
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
            $262.00
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CartSummary;
