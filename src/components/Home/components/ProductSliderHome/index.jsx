import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.scss";

import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import { useEffect } from "react";
import categoryApi from "api/categoryApi";
import { useHistory } from "react-router-dom";
import Product from "features/Product/components/Product";
ProductSliderHome.propTypes = {
  categoryId: PropTypes.number.isRequired,
};
ProductSliderHome.defaultProps = {
  categoryId: 1,
};

const useStyle = makeStyles((theme) => ({
  root: {
    margin: "40px 40px 40px",
  },
  title: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "30px",
  },
}));

function ProductSliderHome({ categoryId }) {
  const classes = useStyle();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Loading...");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const result = await categoryApi.getById(categoryId);
        // console.log(result);
        setProducts(result.data.productList);
        setCategory(result.data.name);
      } catch (error) {
        console.log("Failed to fetch categories", error);
      }
    })();
  }, [categoryId]);

  const handleClick = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={`${classes.root} slider-home`}>
      <Typography variant="h3" component="h3" className={classes.title}>
        {category}
      </Typography>
      <Swiper
        slidesPerView={"auto"}
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

export default ProductSliderHome;
