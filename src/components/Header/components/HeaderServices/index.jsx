import { Box, makeStyles, Typography } from '@material-ui/core';
import { Phone } from '@material-ui/icons';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import React from 'react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles.scss';

HeaderServices.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    background: '#eee',
  },
  swiper: {
    width: '600px',
    height: '50px',
  },
  slide: {
    textAlign: 'center',
    fontSize: '14px',

    display: '-webkit-box',
    display: '-ms-flexbox',
    display: '-webkit-flex',
    display: 'flex',
    WebkitBoxAlign: 'center',
    MsFlexAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '35px',
    height: '25px',
    color: '#2AC37D',
    marginRight: '10px',
  },
  title: {
    fontWeight: 'bolder',
    marginRight: '10px',
    textTransform: 'uppercase',
    fontSize: '16px',
  },
}));

function HeaderServices(props) {
  const classes = useStyles();
  return (
    <Box id="headerService" className={classes.root}>
      <Swiper
        loop={true}
        navigation={true}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        className={classes.swiper}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide className={classes.slide}>
          <FlightLandIcon className={classes.icon} />
          <Typography variant="h6" className={classes.title}>
            FAST DELIVERY:{' '}
          </Typography>{' '}
          Get free standard delivery on every order
        </SwiperSlide>
        <SwiperSlide className={classes.slide}>
          <Phone className={classes.icon} />
          <Typography variant="h6" className={classes.title}>
            support 24/7:{' '}
          </Typography>{' '}
          Support online
        </SwiperSlide>
        <SwiperSlide className={classes.slide}>
          <EventAvailableIcon className={classes.icon} />
          <Typography variant="h6" className={classes.title}>
            Special offer:{' '}
          </Typography>{' '}
          On holidays
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default HeaderServices;
