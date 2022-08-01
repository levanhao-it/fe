import React, { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import LogInForm from "../LogInForm";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { login } from "features/Auth/userSlice";
import { getWishList } from "features/Wishlist/wishListSlice";

LogIn.propTypes = {
  closeDialog: PropTypes.func,
};

function LogIn(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    let email = "";
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      email = resultAction.payload.email;

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar("Login Success", {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }

    try {
      const actionWishList = getWishList({ email });
      const resultActionWishList = await dispatch(actionWishList);
      unwrapResult(resultActionWishList);
    } catch (error) {
      console.log("Cannot fetch wishList");
    }
  };

  return (
    <div>
      <LogInForm onSubmit={handleSubmit} />
    </div>
  );
}

export default LogIn;
