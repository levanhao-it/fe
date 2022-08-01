import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import HomeSlider from './components/HomeSlider';
import ProductSliderHome from './components/ProductSliderHome';
import WhyChooseeUs from './components/WhyChooseeUs';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Link } from 'react-router-dom';

Home.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    width: '250px',
    margin: '40px auto',
  },
  title: {
    lineHeight: '40px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: '20px',
    width: '250px',

    marginTop: '10px',
    textTransform: 'lowercase',
    background: 'white',
    border: '1px solid grey',
  },
}));
function Home(props) {
  const classes = useStyle();
  return (
    <Box>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <HomeSlider />
      <WhyChooseeUs></WhyChooseeUs>
      <Container maxWidth="lg">
        <Typography className={classes.title}>Products Popular</Typography>
        <ProductSliderHome categoryId={1}></ProductSliderHome>
        <ProductSliderHome categoryId={2}></ProductSliderHome>
        <ProductSliderHome categoryId={3}></ProductSliderHome>
        <Box className={classes.root}>
          <Button
            disableElevation
            className={classes.button}
            variant="contained"
            autoCapitalize="none"
            endIcon={<ArrowRightAltIcon />}
            component={Link}
            to={'/products'}
          >
            see all shoes
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
