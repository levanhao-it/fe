import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";

DeliveryOption.propTypes = {
  titleDelivery: PropTypes.string.isRequired,
  descDelivery: PropTypes.string.isRequired,
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "20px",
    border: "1px solid #ccc",
    marginTop: "15px",
    "&:hover": {
      borderColor: "#000",
      cursor: "pointer",
    },
  },
  rootActive: {
    padding: "20px",
    border: "1px solid #000",
    marginTop: "15px",
    position: "relative",
    "&:hover": {
      borderColor: "#000",
      cursor: "pointer",
    },
  },

  titleDelivery: {
    textTransform: "uppercase",
    fontSize: "16px",
    fontWeight: "bold",
  },
  descDelivery: {
    fontSize: "16px",
    marginLeft: "10px",
  },
  iconActive: {
    position: "absolute",
    fontSize: "32px",
    right: "-12px",
    color: "#000",
    top: "-10px",
  },
}));

function DeliveryOption(props) {
  const { titleDelivery, descDelivery, icon, active } = props;
  const classes = useStyle();

  return (
    <div>
      <Box
        display="flex"
        className={active ? classes.rootActive : classes.root}
      >
        {active && <CheckCircleSharpIcon className={classes.iconActive} />}
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h5" className={classes.titleDelivery}>
              {titleDelivery}
            </Typography>
            <Box display="flex" alignItems="center">
              {icon}
              <Typography variant="p" className={classes.descDelivery}>
                {descDelivery}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default DeliveryOption;
