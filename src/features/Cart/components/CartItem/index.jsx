import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  InputBase,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, setQuantity } from "../../cartSlice";
import CartQuantityForm from "../CartQuantityForm";

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: "10px",
    },
  },
  input: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    fontSize: "18px",
    padding: "10px 26px 10px 36px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderColor: "#000",
      boxShadow: "0 0 0 2px rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyle = makeStyles((theme) => ({
  root: {
    border: "1px solid black",
    width: "100%",
    margin: "35px 0",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: "16px",
    textTransform: "uppercase",
    color: "#000",
    "& span": {
      fontWeight: "bold",
    },
  },
  icon: {
    fontSize: "22px",
    color: "#000",
    "&:hover": {
      color: "#2AC37D",
    },
  },
  parent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "20px",
    paddingLeft: "15px",
  },
  form: {
    marginTop: "auto",
    marginBottom: "20px",
    width: "90px",
  },
  header: {
    marginBottom: "10px",
  },
  salePrice: {
    color: "#e32b2b",
    marginLeft: "8px",
  },
  banPrice: {
    textDecoration: "line-through",
  },
  quantity: {
    fontSize: "18px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px 0px 10px 0px",
  },
}));

function CartItem({ item = {} }) {
  const classes = useStyle();
  const [openRemoveConfirm, setOpenRemoveConfirm] = useState(false);

  const dispatch = useDispatch();
  const productDetailId = item.productDetailId;
  const handleSetQuantitySubmit = ({ quantity }) => {
    const newQuantity = quantity;
    dispatch(setQuantity({ productDetailId, quantity: newQuantity }));
  };

  const handleRemoveClick = () => {
    setOpenRemoveConfirm(true);
  };

  const handleRemoveOk = () => {
    dispatch(removeFromCart(productDetailId));
  };
  console.log(item.productDetail.quantity);

  return (
    <Box>
      <Grid container className={classes.root}>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <img
            className={classes.img}
            src={item.productDetail.linkImg}
            alt={item.productDetail.name}
          ></img>
        </Grid>
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          lg={8}
          xl={8}
          className={classes.parent}
        >
          <Grid container className={classes.header}>
            <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
              <Typography className={classes.title}>
                <span>Product :</span> {item.product.name}
              </Typography>
              {item.product.originalPrice > item.productDetail.salePrice ? (
                <>
                  <span variant="p" component="p" className={classes.banPrice}>
                    {item.product.originalPrice * item.quantity}$
                  </span>

                  <span variant="p" component="p" className={classes.salePrice}>
                    {item.productDetail.salePrice * item.quantity}$
                  </span>
                </>
              ) : (
                <span variant="p" component="p">
                  {item.productDetail.salePrice * item.quantity}$
                </span>
              )}
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
              <Box>
                <CloseIcon
                  className={classes.icon}
                  onClick={handleRemoveClick}
                />
              </Box>
            </Grid>
          </Grid>
          <Typography className={classes.title}>
            <span>color: </span> {item.productDetail.color}
          </Typography>
          <Typography className={classes.title}>
            <span>size: </span> {item.productDetail.size}
          </Typography>
          <Box className={classes.quantity}>
            <CartQuantityForm
              value={item.quantity}
              onSubmit={handleSetQuantitySubmit}
              quantityMax={item.productDetail.quantity}
            />
            <span style={{ marginLeft: "10px" }}>
              {item.productDetail.quantity} products are available
            </span>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={openRemoveConfirm}
        onClose={() => setOpenRemoveConfirm(false)}
        aria-labelledby="confirm-dialog"
        disableEscapeKeyDown
        disableBackdropClick
      >
        <DialogTitle id="confirm-dialog">
          <RemoveShoppingCartIcon style={{ marginRight: "10px" }} />
          <Typography variant="span">
            Are you sure you want to remove this item?
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenRemoveConfirm(false)}
            color="primary"
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleRemoveOk();
              setOpenRemoveConfirm(false);
            }}
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CartItem;
