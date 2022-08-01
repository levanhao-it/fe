import React from "react";
import PropTypes from "prop-types";
import { Grid, Hidden } from "@material-ui/core";
import DeliveryForm from "../components/DeliveryAddress";
import DeliveryOrder from "../components/DeliveryOrder";
import DeliveryAddress from "../components/DeliveryAddress";

DeliveryPage.propTypes = {};

function DeliveryPage(props) {
  return (
    <div>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={12} md={8}>
          <DeliveryAddress />
        </Grid>
        <Hidden smDown>
          <Grid item xs={12} sm={12} md={4}>
            <DeliveryOrder />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

export default DeliveryPage;
