import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "1200px",
    margin: "auto",
    padding: "20px",
    overflow: "hidden",
  },
}));

function PaymentFeature(props) {
  const classes = useStyle();
  return <Container></Container>;
}

export default PaymentFeature;
