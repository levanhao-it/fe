import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StraightenIcon from "@material-ui/icons/Straighten";
import { unwrapResult } from "@reduxjs/toolkit";
import ButtonActive from "components/component-custom/ButtonActive";
import GuideSize from "components/GuideSize";
import StorageKeys from "constant/storage-keys";
import { addToCart } from "features/Cart/cartSlice";
import { addWishList, removeWishList } from "features/Wishlist/wishListSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductSilder from "../ProductSlider";

ProductSidebar.propTypes = {
  product: PropTypes.object.isRequired,
};
// prop default value
ProductSidebar.defaultProps = {
  product: {},
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "30px 0 0 40px",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  productName: {
    margin: "20px 0 10px",
    fontWeight: "bold",
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: "24px",
    fontFamily: '"Archivo Narrow"',
  },
  title: {
    textTransform: "uppercase",
    fontSize: "18px",
    color: "#313131",
    borderBottom: "1px solid #e5e5e5",
    display: "block",
    paddingBottom: "10px",
    margin: "30px 0 10px",
    fontWeight: "500",
  },
  reviewDesc: {
    fontSize: "14px",
  },

  listSize: {
    display: "flex",
    flexFlow: "row wrap",
    padding: "0",
    listStyle: "none",
  },

  size: {
    width: "50px",
    height: "50px",
    border: "1px solid #e9ecef",
    marginBottom: "-1px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#000",
      color: "#fff",
    },
  },
  sizeActive: {
    backgroundColor: "#000",
    color: "#fff",
  },

  buttonCart: {
    width: "80%",
    backgroundColor: "#000",
    color: "#fff",
    height: "50px",
    fontSize: "16px",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "#000",
      color: "#ccc",
      opacity: "0.7",
    },
  },
  buttonHeart: {
    width: "100%",
    height: "50px",
    border: "2px solid #000",
    marginTop: "10px",
    borderRadius: "0 !important",
  },
  subTitle: {
    fontSize: "14px",
    fontStyle: "italic",
    textDecoration: "underline",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
  subTitleIcon: {
    margin: "4px 4px 0 0",
  },
  buttonTitle: {
    fontSize: "16px",
    fontWeight: "600",
  },
  imgStyle: {
    width: "54px",
    border: "2px solid #ccc",
    marginRight: "10px",
    cursor: "pointer",
    "&:hover": {
      border: "2px solid #2AC37D",
    },
  },
  imgStyleActive: {
    border: "2px solid #2AC37D",
  },

  containerButton: {
    margin: "15px 0 0 10px",
  },
  wishList: {
    fontWeight: "bold",
  },
}));

function ProductSidebar({ product }) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [choose, setChoose] = useState(false);

  const listDetail = product.productDetailList || [];
  const wishList = useSelector((state) => state.wishList.current);

  const [favourite, setFavourite] = useState(false);
  const [activeImg, setActiveImg] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [productDetail, setProductDetail] = useState(listDetail[0]);
  const loggedInUser = useSelector((state) => state.user.isLoggedIn);
  const isLoggedIn = !!loggedInUser;
  const colorList = [...new Set(listDetail.map((item) => item.color))];
  const productWithImageList = [];

  useEffect(() => {
    const isFavorite = wishList.some((x) => x.product.id === product.id);
    setFavourite(isFavorite);
  });
  colorList.forEach((item, index) => {
    const productWithImage = listDetail.find(
      (item, idx) => item.color === colorList[index]
    );
    productWithImageList.push(productWithImage);
  });

  const [listProductByColor, setListProductByColor] = useState([]);

  const handleStylesClick = (idproductDetail, colorProductDetail) => {
    setListProductByColor(
      listDetail.filter((item) => item.color === colorProductDetail)
    );
    setActiveImg(idproductDetail);
  };

  const handleSelectSize = (productDetail) => {
    setProductDetail(productDetail);
    setActiveSize(productDetail.id);
    setChoose(true);
  };
  const handleSubmitAddToCart = () => {
    if (choose) {
      const action = addToCart({
        productDetailId: productDetail.id,
        productDetail: productDetail,
        product: product,
        quantity: 1,
      });
      if (productDetail.quantity < 1) {
        enqueueSnackbar(
          `Product ${product.name} with color ${productDetail.color} is out of stock.
          Please choose another product`,
          { variant: "error", autoHideDuration: 2000 }
        );
      } else {
        dispatch(action);
        enqueueSnackbar(
          "You have successfully added the product to your cart",
          {
            variant: "success",
            autoHideDuration: 2000,
          }
        );
      }
    } else {
      enqueueSnackbar("Please select styles and size", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleAddWishList = async (productId) => {
    if (!isLoggedIn) return; //show dialog login

    const email = JSON.parse(localStorage.getItem(StorageKeys.USER)).email;

    try {
      const actionWishList = addWishList({ email, productId });
      const resultActionWishList = await dispatch(actionWishList);
      unwrapResult(resultActionWishList);
      console.log(resultActionWishList);
    } catch (error) {
      console.log("Cannot add wishList");
    }

    setFavourite(true);
  };

  const handleRemoveWishList = async (productId) => {
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
      console.log("Cannot remove wishList");
    }
    setFavourite(false);
  };

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" component="h3">
          {product.categoryName}
        </Typography>
        <p>({product.quantityRate} reivews )</p>
      </Box>

      <Box mt={2}>
        <Typography variant="h4" className={classes.productName}>
          {product.name}
        </Typography>
        <Typography variant="h5" className={classes.productPrice}>
          ${product.originalPrice}
        </Typography>
      </Box>

      <Hidden mdUp>
        <ProductSilder product={product} />
      </Hidden>

      <Hidden smDown>
        <Box>
          <Typography variant="p" className={classes.title} gutterBottom>
            Quick review
          </Typography>
          {/* <Typography variant="p" className={classes.reviewDesc} gutterBottom>
            {product.description}
          </Typography> */}
        </Box>
      </Hidden>

      <Box>
        <Typography variant="p" className={classes.title} gutterBottom>
          Choose your styles
        </Typography>
        <Box>
          {productWithImageList?.map((productDetail, index) => (
            <img
              key={productDetail.id}
              src={productDetail.linkImg}
              className={
                classes.imgStyle +
                " " +
                (activeImg === productDetail.id ? classes.imgStyleActive : "")
              }
              alt=""
              onClick={() => {
                handleStylesClick(productDetail.id, productDetail.color);
              }}
            />
          ))}
        </Box>
      </Box>

      <Box>
        <Box position="relative">
          <Typography variant="p" className={classes.title} gutterBottom>
            Available sizes
          </Typography>
          <Box
            position="absolute"
            right="0"
            top={5}
            display="flex"
            alignItems="center"
          >
            <StraightenIcon className={classes.subTitleIcon} />
            <Typography
              variant="p"
              component="a"
              position="absolute"
              className={classes.subTitle}
              onClick={handleClickOpen("paper")}
            >
              Size guide
            </Typography>
          </Box>
        </Box>

        <Box component="ul" className={classes.listSize}>
          {listProductByColor?.map((productDetail) => (
            <li
              key={productDetail.id}
              className={
                classes.size +
                " " +
                (activeSize === productDetail.id ? classes.sizeActive : "")
              }
              onClick={() => handleSelectSize(productDetail)}
            >
              {productDetail.size}
            </li>
          ))}
        </Box>
      </Box>

      <Box mt={3}>
        <ButtonActive
          content="Add to cart"
          className={classes.btnActive}
          onClick={handleSubmitAddToCart}
        />
        {favourite ? (
          <Button
            variant="outlined"
            className={classes.buttonHeart}
            onClick={() => handleRemoveWishList(product.id)}
          >
            <Typography
              variant="button"
              component="p"
              className={classes.wishList}
            >
              Add to wishList
            </Typography>
            <FavoriteIcon />
          </Button>
        ) : (
          <Button
            variant="outlined"
            className={classes.buttonHeart}
            onClick={() => handleAddWishList(product.id)}
          >
            <Typography
              variant="button"
              component="p"
              className={classes.wishList}
            >
              Add to wishList
            </Typography>
            <FavoriteBorderIcon />
          </Button>
        )}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <p className={classes.productPrice}>
            {" "}
            MEN'S AND WOMEN'S FOOTWEAR SIZING
          </p>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <GuideSize></GuideSize>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductSidebar;
