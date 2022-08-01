import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

GuideSize.propTypes = {};

const useStyles = makeStyles((theme) => ({
  img: {
    width: '500px',
    height: 'auto',
  },
}));
function GuideSize(props) {
  const classes = useStyles();
  return (
    <div>
      <img
        src="https://cdn.shopify.com/s/files/1/0102/1906/1345/files/shoes_chart_Men_pic_480x480.png"
        alt=""
        className={classes.img}
      />
    </div>
  );
}

export default GuideSize;
