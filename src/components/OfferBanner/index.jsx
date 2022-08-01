import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, makeStyles } from '@material-ui/core';

OfferBanner.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '20px',
  },
  offer: {
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    '& img': {
      transition: 'transform .5s ease-in-out',
      transform: 'scale(1.04)',
      transformOrigin: '100% 0',
    },
    '&:hover img': {
      transform: 'scale(1.05) translateX(2%)',
    },
  },
}));

function OfferBanner(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={6} className={classes.offer}>
          <a href="#">
            <img
              className={classes.img}
              src="http://nouthemes.net/html/trueshoes/images/banner/banner-1.jpg"
              alt="Giay"
              width="100%"
            />
          </a>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} className={classes.offer}>
          <a href="#">
            <img
              className={classes.img}
              src="http://nouthemes.net/html/trueshoes/images/banner/banner-2.jpg"
              alt="Giay"
              width="100%"
            />
          </a>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OfferBanner;
