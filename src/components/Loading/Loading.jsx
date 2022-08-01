import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";

Loading.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "0",
    right: "0",
    left: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "10",
    display: "flex",
  },
  box: {
    margin: "auto",
    textAlign: "center",
  },
  title: {
    marginTop: "8px",
    color: "#fff",
    fontSize: "20px",
  },
}));
function Loading(props) {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Box className={classes.box}>
        <CircularProgress size="5rem" color="inherit" />
        <Typography className={classes.title}>Loading...</Typography>
      </Box>
    </Box>
  );
}

export default Loading;
