import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import './styles.scss';

ButtonSecondary.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    borderRadius: '0',
    margin: '10px 0',
    height: '48px',
    color: '#000',
    fontWeight: 'bold',
    border: '2px solid #000',
    width: '100%',
    padding: '0 15px',
  },
}));

function ButtonSecondary(props) {
  const { content, widthBtn, type, onClick } = props;
  const classes = useStyle();
  return (
    <Button type={type} className={classes.root} style={{ width: `${widthBtn}` }} onClick={onClick}>
      {content} <ArrowRightAltIcon fontSize="large" />
    </Button>
  );
}

export default ButtonSecondary;
