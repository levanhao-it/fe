import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import ButtonActive from "components/component-custom/ButtonActive";
import ButtonSecondary from "components/component-custom/ButtonSecondary";
import userApi from "api/userApi";
import StorageKeys from "constant/storage-keys";
import { logout } from "features/Auth/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

UserDelete.propTypes = {
  onClose: PropTypes.func,
};
const useStyle = makeStyles((theme) => ({
  titleHeading: {
    textAlign: "left",
    margin: "8px 32px 16px 0",
    textTransform: "uppercase",
    fontSize: "26px",
    fontWeight: "750",
    width: "100%",
  },
}));

function UserDelete({ onClose }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteAccount = async () => {
    try {
      const email =
        JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "";

      console.log(email);

      await userApi.remove({ email });
      const action = logout();
      dispatch(action);

      history.push("/");
    } catch (error) {
      console.log("fail to fetch remove user");
    }
  };

  const handleCancel = () => {
    if (onClose) onClose();
  };

  return (
    <div>
      <Typography component="h3" variant="h5" className={classes.titleHeading}>
        Delete your account
      </Typography>

      <Typography component="p" variant="h6">
        Do you want delete this account ?
      </Typography>
      <Box>
        <ButtonActive content="Delete account" onClick={handleDeleteAccount} />
        <ButtonSecondary content="Cancel" onClick={handleCancel} />
      </Box>
    </div>
  );
}

export default UserDelete;
