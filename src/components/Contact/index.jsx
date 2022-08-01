import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import about from '../../images/about.jpg';

Contact.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${about})`,
    backgroundSize: 'cover',
    height: '850px',
  },

  box: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '2rem',
    borderRadius: '1rem',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  title: {
    color: 'white',
    fontSize: '50px',
    fontWeight: 'bold',
    marginTop: '100px',
  },
  information: {
    color: 'white',
    fontSize: '20px',
    marginTop: '50px',
  },
}));

function Contact(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>About</title>
      </Helmet>
      <Container maxWidth="sm" className={classes.box}>
        <Grid container spacing={2}>
          <Grid item>
            <h1 className={classes.title}>About Us</h1>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" className={classes.information}>
                  Shop shoes is here to provide you with the best shoes in the world.
                </Typography>
                <Typography gutterBottom variant="subtitle1" className={classes.information}>
                  With our wide range of shoes, you can find the one that suits you.
                </Typography>
                <Typography gutterBottom variant="subtitle1" className={classes.information}>
                  And more information about our products can be found in the product page.
                </Typography>
                <Typography gutterBottom variant="subtitle1" className={classes.information}>
                  Answer any questions you have and we will get back to you as soon as possible.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Contact;
