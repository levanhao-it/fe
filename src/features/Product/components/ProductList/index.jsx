import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Product from '../Product';
import { Alert } from '@material-ui/lab';

ProductList.propTypes = {
  data: PropTypes.object.isRequired,
};

ProductList.defaultProps = {
  data: [],
};

function ProductList({ data }) {
  return (
    <Box paddingBottom={2}>
      <Grid container>
        {data.length === 0 ? (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Alert severity="warning">Sorry. No matching products found!</Alert>
          </Grid>
        ) : (
          data.map((product) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Product data={product} />
              </Grid>
            );
          })
        )}
        {}
      </Grid>
    </Box>
  );
}

export default ProductList;
