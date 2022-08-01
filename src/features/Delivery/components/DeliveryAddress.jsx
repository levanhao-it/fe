import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import AirportShuttleOutlinedIcon from "@material-ui/icons/AirportShuttleOutlined";
import StoreMallDirectoryOutlinedIcon from "@material-ui/icons/StoreMallDirectoryOutlined";
import InputField from "components/form-controls/InputField";
import ButtonActive from "components/component-custom/ButtonActive";
import DeliveryOption from "./DeliveryOption";
import addressApi from "api/addressApi";
import StorageKeys from "constant/storage-keys";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@material-ui/icons/Add";
import AddressDelete from "features/Address/components/AddressDelete";
import AddressEdit from "features/Address/components/AddressEdit";
import AddressAdd from "features/Address/components/AddressAdd";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import { useSnackbar } from "notistack";
import optionalDeliveryApi from "api/optionalDeliveryApi";
import { useDispatch, useSelector } from "react-redux";
import orderApi from "api/orderApi";
import { useHistory } from "react-router-dom";
import { resetCart } from "features/Cart/cartSlice";
import Loading from "components/Loading/Loading";

DeliveryAddress.propTypes = {};

const useStyle = makeStyles((theme) => ({
  headingTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "26px",
  },
  subHeading: {
    fontSize: "16px",
  },
  iconDelivery: {
    fontSize: "20px",
  },
  boxAddress: {
    minHeight: "140px",
    border: "2px solid #ccc",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
  },

  boxAddressActive: {
    minHeight: "140px",
    border: "2px solid #000",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    cursor: "pointer",
  },
  nameAddress: {
    fontWeight: "bold",
  },
  btnAddress: {
    "& > span": {
      textTransform: "capitalize",
      fontWeight: "bold",
      textDecoration: "underline",
    },

    "& > span:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
  iconActive: {
    position: "absolute",
    fontSize: "32px",
    right: "-12px",
    color: "#000",
    top: "-10px",
  },
}));

const MODE = {
  ADD: "add",
  DELETE: "delete",
  UPDATE: "update",
};

function DeliveryAddress(props) {
  const classes = useStyle();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.ADD);
  const [addressList, setAddressList] = useState([]);
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const [optionalDeliveryList, setOptionalDeliveryList] = useState([]);
  const [optionalDelivey, setOptionalDelivery] = useState({});
  const voucher = useSelector((state) => state.voucher);
  const orderList = useSelector((state) => state.cart.cartItems);
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const email =
          JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "";
        const { data } = await addressApi.getAll({ email });
        setAddressList(data);
        const addressActive = data.find((x) => x.defaultAddress);
        setAddress(addressActive);
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await optionalDeliveryApi.getAll();
        setOptionalDeliveryList(data);
        setOptionalDelivery(data[0]);
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const orderDetailRequestList = orderList.map((x) => {
        return {
          productDetailId: x.productDetailId,
          quantity: x.quantity,
        };
      });

      const voucherCode = voucher.code || "NO_VOUCHER";

      const payload = {
        email: JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "",
        addressDeliveryId: address.id,
        voucherCode,
        optionalDeliveryId: optionalDelivey.id,
        orderDetailRequestList,
      };

      const { data } = await orderApi.add(payload);

      dispatch(resetCart());
      history.push(`/checkout/${data.id}`);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar(
        "Please add new address delivery or select address delivery",
        {
          variant: "error",
          autoHideDuration: 2000,
        }
      );
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickAdd = () => {
    setMode(MODE.ADD);
    handleClickOpen();
  };

  const handleClickEdit = (address, e) => {
    e.stopPropagation();
    setMode(MODE.UPDATE);
    setAddress(address);
    handleClickOpen();
  };

  const handleClickDelete = (e) => {
    e.stopPropagation();
    setMode(MODE.DELETE);
    handleClickOpen();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelSubmitSuccess = (data) => {
    setAddressList(data);
  };

  const handleChangeDefault = async (address) => {
    try {
      const values = {
        defaultAddress: true,
        email: JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "",
      };

      await addressApi.update(address.id, values);

      const email =
        JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "";
      const { data } = await addressApi.getAll({ email });

      setAddressList(data);
      setAddress(address);
    } catch (error) {
      console.log("Fail to set default for your address: ", error.message);
    }
  };

  const handleChangeOptionalDelivery = (x) => {
    setOptionalDelivery(x);
  };

  return (
    <>
      <Box mt={4}>
        <Typography variant="h3" className={classes.headingTitle}>
          Shipping Adrress
        </Typography>
        <Box mt={4}>
          <Grid container spacing={2}>
            {addressList.map((address) => (
              <Grid item xs={12} sm={12} md={6} lg={6} key={address.id}>
                <Box
                  className={
                    address.defaultAddress
                      ? classes.boxAddressActive
                      : classes.boxAddress
                  }
                  onClick={() => handleChangeDefault(address)}
                >
                  {address.defaultAddress && (
                    <CheckCircleSharpIcon className={classes.iconActive} />
                  )}
                  <Typography className={classes.nameAddress}>
                    {address.fullName}
                  </Typography>
                  <Box>
                    <Typography>{address.address}</Typography>
                    <Typography>{address.phoneNumber}</Typography>
                  </Box>

                  <Box>
                    <Button
                      size="small"
                      className={classes.btnAddress}
                      onClick={(e) => handleClickEdit(address, e)}
                    >
                      Edit
                    </Button>
                    {!address.defaultAddress && (
                      <Button
                        size="small"
                        className={classes.btnAddress}
                        onClick={(e) => handleClickDelete(e)}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>
                </Box>
              </Grid>
            ))}

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box className={classes.boxAddress}>
                <Typography>New address</Typography>
                <Box>
                  <IconButton aria-label="delete" onClick={handleClickAdd}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h3" className={classes.headingTitle}>
          Delivery options
        </Typography>
        {optionalDeliveryList.map((x) => (
          <Box onClick={() => handleChangeOptionalDelivery(x)}>
            <DeliveryOption
              key={x.id}
              titleDelivery={x.name}
              descDelivery={x.description}
              icon={
                <AirportShuttleOutlinedIcon className={classes.iconDelivery} />
              }
              active={x.id === optionalDelivey.id}
            />
          </Box>
        ))}
      </Box>

      <ButtonActive
        content="Review and pay"
        widthBtn={matches ? "100%" : "50%"}
        onClick={handleSubmit}
      />

      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <DialogContent>
          {mode === MODE.UPDATE && (
            <>
              <AddressEdit
                data={address}
                closeDialog={handleClose}
                handelSubmitSuccess={handelSubmitSuccess}
              />
            </>
          )}

          {mode === MODE.DELETE && (
            <>
              <AddressDelete
                data={address}
                closeDialog={handleClose}
                handelSubmitSuccess={handelSubmitSuccess}
              />
            </>
          )}

          {mode === MODE.ADD && (
            <>
              <AddressAdd
                closeDialog={handleClose}
                handelSubmitSuccess={handelSubmitSuccess}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      {loading && <Loading />}
    </>
  );
}

export default DeliveryAddress;
