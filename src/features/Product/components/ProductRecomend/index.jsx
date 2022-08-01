import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Product from '../Product';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import './styles.scss';
import { useEffect } from 'react';
import categoryApi from 'api/categoryApi';
import { useHistory } from 'react-router-dom';
ProductRecomend.propTypes = {
  product: PropTypes.object.isRequired,
};
ProductRecomend.defaultProps = {
  product: {},
};

const useStyle = makeStyles((theme) => ({
  root: {
    margin: '40px 0 40px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '24px',
  },
}));

function ProductRecomend({ product }) {
  const classes = useStyle();
  const categoryId = product.categoryId;
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const result = await categoryApi.getById(categoryId);
        setProducts(result.data.productList);
      } catch (error) {
        console.log('Failed to fetch categories', error);
      }
    })();
  }, [categoryId]);

  const handleClick = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={`${classes.root} slider-recommed`}>
      <Typography variant="h3" component="h3" className={classes.title}>
        OTHERS ALSO BOUGHT
      </Typography>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },

          450: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          960: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} onClick={() => handleClick(product.id)}>
            <Product data={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductRecomend;
