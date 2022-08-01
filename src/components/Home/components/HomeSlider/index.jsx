import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles.scss';

// import required modules
import { Box, makeStyles, Typography } from '@material-ui/core';
import ButtonActive from 'components/component-custom/ButtonActive';
import { Link } from 'react-router-dom';
import { A11y, Autoplay, EffectFade, Pagination } from 'swiper';
import home1 from '../../../../images/home1.jpg';
import home2 from '../../../../images/home2.jpg';

const useStyles = makeStyles((theme) => ({
  buttonCart: {
    width: '40%',
    backgroundColor: '#2AC37D',
    color: '#fff',
    height: '50px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '60px',
    border: 'none',
    margin: '20px 0',
    '&:hover': {
      backgroundColor: '#2AC37D',
      color: '#ccc',
    },
  },
  buttonHeart: {
    width: 'calc(20% - 5px)',
    marginLeft: '5px',
    height: '50px',
    border: '2px solid #000',
  },
  buttonTitle: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '2',
  },
  box: {
    position: 'absolute',
    top: '30%',
    left: '5%',
    zIndex: '1',
  },
  // slogan: {
  //   color: '#2AC37D',
  //   fontSize: '28px',
  //   fontWeight: '600',
  //   textTransform: 'uppercase',
  //   fontFamily: 'Georgia, serif',
  //   width: '55%',
  //   marginBottom: '20px',
  // },
}));

HomeSlider.propTypes = {};

function HomeSlider(props) {
  const classes = useStyles();
  return (
    <Box className="slider">
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[EffectFade, Pagination, Autoplay, A11y]}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img src={home2} alt="home1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={home1} alt="home2" />
        </SwiperSlide>
      </Swiper>

      <Box className={classes.box}>
        <Typography className="slogan" variant="h2" component="h3">
          Life is better in running shoes
        </Typography>

        <Box component={Link} to="/products" style={{ textDecoration: 'none' }}>
          {/* <Button variant="contained" className={classes.buttonCart} size="large">
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography variant="h5" className={classes.buttonTitle}>
                shop now
              </Typography>
              <ArrowRightAltIcon fontSize="large" />
            </Box>
          </Button> */}
          <ButtonActive content="Shop Now" widthBtn="40%"></ButtonActive>
        </Box>
      </Box>
    </Box>
  );
}

export default HomeSlider;
