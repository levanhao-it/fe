import React from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { deepOrange, yellow } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import userApi from "api/userApi";
import ButtonSecondary from "components/component-custom/ButtonSecondary";
import { logout, updateUser } from "features/Auth/userSlice";
import UserDetail from "features/User/components/UserDetail";
import UserEmail from "features/User/components/UserEmail";
import UserPassword from "features/User/components/UserPassword";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { jsonToFormData } from "utils";
import { unwrapResult } from "@reduxjs/toolkit";
import UserDelete from "./UserDelete";

UserAccount.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    padding: "32px 16px",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "30px",
    marginTop: "15px",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  subHeding: {
    fontSize: "16px",
    marginTop: "10px",
  },
  container: {
    marginTop: "60px",
  },
  content: {
    fontSize: "15px",
    textTransform: "uppercase",
    marginTop: "10px",
  },
  edit: {
    display: "inline-block",
    fontSize: "15px",
    textTransform: "uppercase",
    marginTop: "10px",
    textDecoration: "underline",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
      cursor: "pointer",
    },
  },
  headingTitle: {
    fontSize: "20px",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  containerItem: {
    marginTop: "40px",
  },
  link: {
    display: "block",
    textDecoration: "none",
    marginBottom: "5px",
    color: "#000",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
  closeButton: {
    position: "absolute",
    top: "2px",
    right: "2px",
    zIndex: "1",
  },

  box1: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  avatar: {
    width: "250px",
    height: "250px",
    color: "#fff",
    backgroundColor: deepOrange[500],
    fontSize: "150px",
  },
  editImage: {
    display: "inline-block",
    fontSize: "15px",
    textTransform: "uppercase",
    marginTop: "10px",
    marginLeft: "80px",
    textDecoration: "underline",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
      cursor: "pointer",
    },
  },
  saveImage: {
    display: "inline-block",
    fontSize: "15px",
    textTransform: "uppercase",
    marginTop: "10px",
    marginLeft: "125px",
    textDecoration: "underline",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
      cursor: "pointer",
    },
  },
}));

const MODE = {
  INFORMATION: "infomation",
  EMAIL: "email",
  PASSWORD: "password",
  DELETE: "delete",
};

function UserAccount(props) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.INFORMATION);
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const name = user.avatar ? "" : user.full_name?.slice(0, 1).toUpperCase();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenInfomation = () => {
    setMode(MODE.INFORMATION);
    handleClickOpen();
  };

  const handleOpenEmail = () => {
    setMode(MODE.EMAIL);
    handleClickOpen();
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    history.push("/");
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await userApi.getUser();
        setUser(data.data);
        setFile(data.data.avatar);
      } catch (error) {
        console.log("Failed to fetch user: ", error);
      }
    })();
  }, []);

  const [flag, setFlag] = useState(false);

  const handleChange = function loadFile(event) {
    if (event.target.files.length > 0) {
      const fileSelected = URL.createObjectURL(event.target.files[0]);
      setFile(fileSelected);
      setImage(event.target.files[0]);
      setFlag(true);
    }
  };

  const handleSaveAvatar = async () => {
    try {
      const jsonObject = {
        fileImg: image,
        userRequest: JSON.stringify({}).trim(),
      };
      const data = jsonToFormData(jsonObject);
      const { payload } = await dispatch(updateUser(data));
      unwrapResult(payload);
      if (typeof payload.email !== "undefined") {
        setFlag(false);
        enqueueSnackbar("Change information user successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  const handleChangeInfor = async (data) => {
    setUser(data);
    handleClose();
  };

  const handleDeleteAccount = () => {
    setMode(MODE.DELETE);
    handleClickOpen();
  };

  return (
    <div>
      <Box>
        <Box className={classes.root}>
          <Box className={classes.box1}>
            <Box>
              <Typography
                variant="h5"
                component="h5"
                className={classes.heading}
              >
                My details
              </Typography>
              <Typography
                variant="p"
                component="p"
                className={classes.subHeding}
              >
                Feel free to edit any of your details below so your account is
                up to date.
              </Typography>
              <Box className={classes.container}>
                <Typography
                  variant="h5"
                  component="h5"
                  className={classes.heading}
                >
                  DETAILS
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  className={classes.content}
                >
                  Full Name: {user.full_name}
                </Typography>

                <Typography
                  variant="p"
                  component="p"
                  className={classes.content}
                >
                  Create Date: {moment(user.modify_date).format("LLLL")}
                  <Typography
                    variant="p"
                    component="p"
                    className={classes.content}
                  >
                    Quantity Order: {user.quantityOrders}
                  </Typography>
                </Typography>
                <Typography
                  variant="p"
                  component="span"
                  className={classes.edit}
                  onClick={handleOpenInfomation}
                >
                  Edit
                </Typography>
              </Box>
            </Box>
            <Box style={{ width: "300px" }}>
              <input
                type="file"
                onChange={handleChange}
                id="upload"
                accept="image/*"
                style={{ display: "none" }}
              />
              <label htmlFor="upload">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  {/* <Avatar id="avatar" src={file} className={classes.avatar}>
                    N
                  </Avatar> */}
                  {user.avatar ? (
                    <Avatar
                      id="avatar"
                      src={file}
                      className={classes.avatar}
                    ></Avatar>
                  ) : (
                    <Avatar id="avatar" className={classes.avatar}>
                      {name}
                    </Avatar>
                  )}
                </IconButton>
                {/* <Typography variant="p" component="span" className={classes.editImage}>
                  Choose Image
                </Typography> */}
                {!flag && (
                  <Typography
                    variant="p"
                    component="span"
                    className={classes.editImage}
                  >
                    Change Image
                  </Typography>
                )}
              </label>
              {flag && (
                <Typography
                  variant="p"
                  component="span"
                  className={classes.saveImage}
                  onClick={handleSaveAvatar}
                >
                  Save
                </Typography>
              )}
              <label htmlFor="avatar" />
            </Box>
          </Box>

          <Box className={classes.container}>
            <Typography variant="h5" component="h5" className={classes.heading}>
              Login details
            </Typography>

            <Box className={classes.containerItem}>
              <Typography
                variant="p"
                component="p"
                className={classes.headingTitle}
              >
                Email
              </Typography>
              <Typography variant="p" component="p">
                {user.email}
              </Typography>
              <Typography
                variant="p"
                component="span"
                className={classes.edit}
                onClick={handleOpenEmail}
              >
                Edit
              </Typography>
            </Box>
            <Box className={classes.containerItem}>
              <Typography
                variant="p"
                component="p"
                className={classes.headingTitle}
              >
                LOG OUT FROM ALL WEB BROWSERS
              </Typography>
              <Typography
                variant="p"
                component="p"
                className={classes.subHeding}
              >
                This will log you out from all web browsers you have used to
                access the adidas website. To log in again, you'll have to enter
                your credentials.
              </Typography>
              <ButtonSecondary
                content="Log me out"
                widthBtn={matches ? "100%" : "50%"}
                onClick={handleLogoutClick}
              />
            </Box>

            <Box className={classes.containerItem}>
              <Typography
                variant="p"
                component="p"
                className={classes.headingTitle}
              >
                MANAGE ACCOUNT
              </Typography>
              <ButtonSecondary
                content="Delete account"
                widthBtn={matches ? "100%" : "50%"}
                onClick={handleDeleteAccount}
              />
              <Typography
                variant="p"
                component="p"
                className={classes.subHeding}
              >
                By deleting your account you will no longer be a member of the
                adidas adiClub.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.footer}>
          <Typography
            variant="p"
            component="p"
            className={classes.headingTitle}
          >
            Need help ?
          </Typography>

          <Box className={classes.root} mt={2}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Link path="" className={classes.link}>
                  Products
                </Link>
                <Link path="" className={classes.link}>
                  Ordering & Payments
                </Link>
                <Link path="" className={classes.link}>
                  Delivery
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Link path="" className={classes.link}>
                  Promotion & Voucher
                </Link>
                <Link path="" className={classes.link}>
                  Returns & Refunds
                </Link>
                <Link path="" className={classes.link}>
                  Account & Newsletter
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Link path="" className={classes.link}>
                  Company Information
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Dialog
        // disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODE.INFORMATION && (
            <UserDetail handelSubmitSuccess={handleChangeInfor} />
          )}
          {mode === MODE.EMAIL && <UserEmail />}
          {mode === MODE.PASSWORD && <UserPassword />}
          {mode === MODE.DELETE && <UserDelete onClose={handleClose} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserAccount;
