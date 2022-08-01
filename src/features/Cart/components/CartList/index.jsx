import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../CartItem';
import { Box } from '@material-ui/core';

CartList.propTypes = {
  data: PropTypes.array,
};

function CartList({ data = [] }) {
  return (
    <Box>
      {data.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
    </Box>
  );
}

export default CartList;
