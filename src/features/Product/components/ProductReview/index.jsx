import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';
import { Box, Link, makeStyles, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import rateApi from 'api/rateApi';
import moment from 'moment';

ProductReview.propTypes = {
  rateList: PropTypes.array,
};

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    backgroundColor: '#f1f1f1',
    padding: '12px',
  },
  commentContent: {
    marginTop: '14px',
    display: 'block',
    fontSize: '14px',
    color: '#5b5b5b',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '20px',
  },
  commentName: {
    color: '#2AC37D',
    fontWeight: 'bold',
  },
  ratingHeading: {
    fontSize: '14px',
  },
}));

function formatContent(content) {
  return content.split('\n');
}

function ProductReview({ rateList = [] }) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      {rateList.map((item) => (
        <Box key={item.idRate}>
          <Box className={classes.ratingContent}>
            <Rating name="read-only" value={item.rating} readOnly size="small" />
            <Typography variant="p" className={classes.ratingHeading} component="p">
              By {''}
              <Typography display="inline" variant="p" className={classes.commentName}>
                {item.userName}
              </Typography>{' '}
              {moment(item.modifyDate).format('LLLL')}
            </Typography>
          </Box>

          <Typography variant="p" className={classes.commentContent} gutterBottom>
            {formatContent(item.content).map((item, index) => (
              <span key={index}>
                {item}
                <br />
              </span>
            ))}
          </Typography>
        </Box>
      ))}
    </div>
  );
}

export default ProductReview;
