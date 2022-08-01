import React from 'react';
import PropTypes from 'prop-types';
import HeaderNavigation from './components/HeaderNavigation';
import HeaderServices from './components/HeaderServices';
import { Box, Hidden, makeStyles } from '@material-ui/core';

import HeaderAuthentic from './components/HeaderAuthemtic';

Header.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: '10',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: "#fff",
  }
}))

function Header(props) {
  const classes =  useStyle();
  return (
    <Box className={classes.root} >
      <Hidden smDown>
        <HeaderAuthentic />
      </Hidden>
      
      <HeaderNavigation />

      <Hidden smDown>
        <HeaderServices />
      </Hidden>
    </Box>
  );
}

export default Header;
