import { Box, makeStyles, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { unwrapResult } from '@reduxjs/toolkit';
import { THUMBNAIL_PLACEHOLDER } from 'constant';
import StorageKeys from 'constant/storage-keys';
import { addWishList, removeWishList } from 'features/Wishlist/wishListSlice';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './styles.scss';

Product.propTypes = {
  data: PropTypes.object.isRequired,
};

Product.defaultProps = {
  data: {},
};

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'relative',
    transition: 'all 0.4s ease',
    '&:hover': {
      border: '1px solid #000',
    },
  },
  container: {
    position: 'relative',
  },
  btn: {
    background: '#2AC37D',
    fontSize: '16px',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    width: '100%',
    margin: '0 0 20px 0',
    '&:hover': {
      background: 'linear-gradient(45deg, #5c5c5c 30%, #383838 90%)',
      transition: 'all 0.3s ease-in-out',
    },
  },
  img: {
    cursor: 'pointer',
    width: '100%',
    height: '260px',
  },

  imgChildren: {
    cursor: 'pointer',
    height: '50px',
    width: '50px',
    paddingRight: '5px',
    '&:hover': {
      borderBottom: '2px solid #000',
    },
  },
  name: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#5b5b5b',
    lineHeight: '20px',
    cursor: 'pointer',
    marginBottom: '10px',
    '&:hover': {
      color: '#2AC37D',
    },
  },
  favorite: {
    position: 'absolute',
    top: '20px',
    right: '18px',
    display: 'block',
    width: '40px',
    height: '40px',
    zIndex: '2',
    webkitBorderRadius: '50%',
    mozBorderRadius: '50%',
    msBorderRadius: '50%',
    borderRadius: '50%',
    webkitTransition: 'all 0.4s ease',
    mozTransition: 'all 0.4s ease',
    transition: 'all 0.4s ease',
    cursor: 'pointer',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#000',
    fontSize: '20px',
  },

  price: {
    position: 'absolute',
    left: '14px',
    bottom: '0px',
    backgroundColor: '#fff',
    padding: '3px 5px',
    display: 'flex',
  },
  nameDesc: {
    color: '#767677',
    fontSize: '12px',
  },
  salePrice: {
    color: '#e32b2b',
    marginLeft: '8px',
  },
  banPrice: {
    textDecoration: 'line-through',
  },
}));

function Product({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.isLoggedIn);
  const isLoggedIn = !!loggedInUser;
  const wishList = useSelector((state) => state.wishList.current);
  const history = useHistory();
  const colorList = [...new Set(data.productDetailList.map((item) => item.color))];
  const productWithImageList = [];
  colorList.forEach((item, index) => {
    const productWithImage = data.productDetailList.find(
      (item, idx) => item.color === colorList[index]
    );
    productWithImageList.push(productWithImage);
  });

  const [image, setImage] = useState(data.productDetailList[0].linkImg || THUMBNAIL_PLACEHOLDER);
  const [favourite, setFavourite] = useState(() => {
    return wishList.some((x) => x.product.id === data.id);
  });
  useEffect(() => {
    setFavourite(() => {
      return wishList.some((x) => x.product.id === data.id);
    });
  }, [wishList]);

  const [priceSale, setPriceSale] = useState(data.productDetailList[0].salePrice);
  const handleMouseLeave = () => {
    setImage(data.productDetailList[0].linkImg || THUMBNAIL_PLACEHOLDER);
  };

  const handleMouseOver = (img, salePrice) => {
    setImage(img);
    setPriceSale(salePrice);
  };

  const handleAddWishList = async (productId, e) => {
    e.stopPropagation();
    if (!isLoggedIn) return; //show dialog login

    const email = JSON.parse(localStorage.getItem(StorageKeys.USER)).email;

    try {
      const actionWishList = addWishList({ email, productId });
      const resultActionWishList = await dispatch(actionWishList);
      unwrapResult(resultActionWishList);
      console.log(resultActionWishList);
    } catch (error) {
      console.log('Cannot add wishList');
    }

    setFavourite(true);
  };

  const handleRemoveWishList = async (productId, e) => {
    e.stopPropagation();
    if (!isLoggedIn) return; //show dialog login

    const item = wishList.find((x) => x.product.id === productId);
    const id = item.idWishList;
    const email = JSON.parse(localStorage.getItem(StorageKeys.USER)).email;
    try {
      const actionWishList = removeWishList({ email, id });
      const resultActionWishList = await dispatch(actionWishList);
      unwrapResult(resultActionWishList);
      console.log(resultActionWishList);
    } catch (error) {
      console.log('Cannot remove wishList');
    }
    setFavourite(false);
  };
  const handleClick = () => {
    history.push(`/products/${data.id}`);
  };

  return (
    <Box padding={1} className={`${classes.box} product-root`} onClick={handleClick}>
      <Box minHeight="215px" className={classes.container}>
        {favourite ? (
          <Box className={classes.favorite} onClick={(e) => handleRemoveWishList(data.id, e)}>
            <FavoriteIcon className={`${classes.icon} ${classes.iconFavourite}`} />
          </Box>
        ) : (
          <Box className={classes.favorite} onClick={(e) => handleAddWishList(data.id, e)}>
            <FavoriteBorderIcon className={classes.icon} />
          </Box>
        )}

        <img src={image} alt={data.name} className={classes.img} />

        <Box
          component="span"
          fontSize="14px"
          mr={1}
          className={`${classes.price} product-root__price`}
        >
          {data.originalPrice > priceSale ? (
            <>
              <Typography variant="p" component="p" className={classes.banPrice}>
                ${data.originalPrice}
              </Typography>

              <Typography variant="p" component="p" className={classes.salePrice}>
                ${priceSale}
              </Typography>
            </>
          ) : (
            <Typography variant="p" component="p">
              ${data.originalPrice}
            </Typography>
          )}
        </Box>
      </Box>
      <Box>
        <Box>
          {productWithImageList.map((productDetail) => {
            return (
              <img
                onMouseOver={() =>
                  handleMouseOver(
                    productDetail.linkImg || THUMBNAIL_PLACEHOLDER,
                    productDetail.salePrice
                  )
                }
                onMouseLeave={handleMouseLeave}
                src={productDetail.linkImg || THUMBNAIL_PLACEHOLDER}
                alt={data.name}
                width="30px"
                height="30px"
                className={classes.imgChildren}
              />
            );
          })}
        </Box>

        <Typography variant="p" className={classes.name}>
          {data.name}
        </Typography>

        <Typography variant="p" component="p" className={classes.nameDesc}>
          {data.categoryName}
        </Typography>
      </Box>
    </Box>
  );
}

export default Product;
