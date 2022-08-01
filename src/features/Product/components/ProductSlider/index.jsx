import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

import './styles.scss';

ProductSilder.propTypes = {
  product: PropTypes.object,
};

const useStyle = makeStyles((theme) => ({
  silderImg: {
    width: '600px',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

function ProductSilder({ product = {} }) {
  const listDetail = product.productDetailList || [];
  const colorList = [...new Set(listDetail.map((item) => item.color))];
  const productWithImageList = [];
  colorList.forEach((item, index) => {
    const productWithImage = listDetail.find((item, idx) => item.color === colorList[index]);
    productWithImageList.push(productWithImage);
  });

  const classes = useStyle();
  return (
    <div className="product-slider">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        auto
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {productWithImageList.map((item, index) => (
          <SwiperSlide key={index}>
            <Box className={classes.silderImg}>
              <img src={item.linkImg} alt="" width="100%" />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSilder;
