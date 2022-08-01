import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import Close from "@material-ui/icons/Close";
import { HEADER_AUTHENTIC } from "constant";
import LogIn from "features/Auth/components/LogIn";
import Register from "features/Auth/components/Register";
import VerifyForm from "features/Auth/components/VerifyForm";
import { logout } from "features/Auth/userSlice";
import { reset } from "features/Wishlist/wishListSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

HeaderAuthentic.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 4),
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    height: `${HEADER_AUTHENTIC}`,
    backgroundColor: "#f5f5f5",
  },

  list: {
    display: "flex",
    listStyle: "none",

    "& > li": {
      padding: theme.spacing(0, 2),
      fontSize: "0.8rem",
    },

    "& > li:hover": {
      color: "#757575",
      cursor: "pointer",
    },

    "& > li ~ li": {
      borderLeft: "1px solid #000",
    },
  },

  dialog: {
    fontSize: "1.6rem",
    minWidth: "300px",
    position: "relative",
  },
  icon: {
    float: "right",
    position: "absolute",
    top: "5px",
    right: "5px",
    cursor: "pointer",
    fontSize: "30px",
  },
  footerForm: {
    justifyContent: "center",
    margin: "10px 0 20px",
  },
  footerTitle: {
    color: "#8d8d8d",
  },
  footerLink: {
    marginLeft: "4px",
    textDecoration: "underline",
    cursor: "pointer",
  },
  menu: {
    paddingTop: "40px",
  },
  avatar: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    color: "#fff",
    backgroundColor: deepOrange[500],
    "&:hover": {
      cursor: "pointer",
    },
  },
  verifyLink: {
    textDecoration: "underline",
    cursor: "pointer",
  },

  boxName: {
    display: "flex",
    alignItems: "center",
  },

  titleName: {
    marginLeft: "4px",
  },
}));

const MODE = {
  LOGIN: "login",
  REGISTER: "resgister",
  VERIFY: "verify",
};

function HeaderAuthentic(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.user.isLoggedIn);

  const isLoggedIn = !!loggedInUser;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);

    const actionWishlist = reset();
    dispatch(actionWishlist);
    history.push("/");
  };

  const handleClickLogin = () => {
    setMode(MODE.LOGIN);
    handleClickOpen();
  };

  const handleClickRegister = () => {
    setMode(MODE.REGISTER);
    handleClickOpen();
  };

  const handleClickVerify = () => {
    setMode(MODE.VERIFY);
    handleClickOpen();
  };

  const classes = useStyles();
  const user = useSelector((state) => state.user.current);

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="body2">
          460 West 34th Street, 15th floor, New York - Hotline: 804-377-3580 -
          804-399-3580
        </Typography>
        <ul className={classes.list}>
          {!isLoggedIn && (
            <>
              <li onClick={handleClickRegister}>Join Us</li>
              <li onClick={handleClickLogin}>Sign In</li>
            </>
          )}
          {isLoggedIn && (
            <li>
              <Box className={classes.boxName} onMouseOver={handleUserClick}>
                <IconButton
                  style={{ padding: "0px", border: "1px solid #000" }}
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  {user.avatar ? (
                    <Avatar
                      id="avatar"
                      src={user.avatar}
                      className={classes.avatar}
                    ></Avatar>
                  ) : (
                    <Avatar id="avatar" className={classes.avatar}>
                      {user.userName.charAt(0)}
                    </Avatar>
                  )}
                </IconButton>
                <Typography className={classes.titleName}>
                  {user.userName}
                </Typography>
              </Box>
            </li>
          )}
        </ul>
      </Box>
      <Menu
        className={classes.menu}
        style={{ top: "25px" }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        MenuListProps={{ onMouseLeave: handleCloseMenu }}
      >
        <MenuItem component={Link} to="/user">
          My account
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <Close className={classes.icon} onClick={handleClose}></Close>
        <DialogContent>
          {mode === MODE.LOGIN && (
            <>
              <LogIn closeDialog={handleClose} />
              <Box display="flex" className={classes.footerForm}>
                <Typography
                  variant="p"
                  component="p"
                  className={classes.footerTitle}
                >
                  Not a member?{" "}
                </Typography>
                <Typography
                  variant="span"
                  component="span"
                  className={classes.footerLink}
                  onClick={() => setMode(MODE.REGISTER)}
                >
                  Join Us
                </Typography>
              </Box>
            </>
          )}

          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClickVerify} />
              <Box display="flex" className={classes.footerForm}>
                <Typography
                  variant="p"
                  component="p"
                  className={classes.footerTitle}
                >
                  Already a member?{" "}
                </Typography>
                <Typography
                  variant="span"
                  component="span"
                  className={classes.footerLink}
                  onClick={() => setMode(MODE.LOGIN)}
                >
                  Sign In
                </Typography>
              </Box>
            </>
          )}
          {mode === MODE.VERIFY && (
            <>
              <VerifyForm />

              <Box display="flex" className={classes.footerForm}>
                <h4
                  onClick={() => setMode(MODE.LOGIN)}
                  className={classes.verifyLink}
                >
                  Click here to Login
                </h4>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default HeaderAuthentic;
