import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Helmet } from 'react-helmet-async';

NotFound.propTypes = {};

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#fff',
  },
  img: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: ' 50%',
  },
  linkHome: {
    textDecoration: 'underline',
    color: '#00bcd4',
    cursor: 'pointer',
    marginTop: '20px',
    textAlign: 'center',
  },
}));

function NotFound(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <img
        className={classes.img}
        src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
        alt="not-found"
      />
      <Link to="/home">
        <p className={classes.linkHome}> Go Home</p>
      </Link>
    </div>
  );
}

export default NotFound;
