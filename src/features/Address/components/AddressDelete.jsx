import React from "react";
import PropTypes from "prop-types";
import AddressDeleteForm from "./AddressDeleteForm";
import addressApi from "api/addressApi";
import { useSnackbar } from "notistack";
import StorageKeys from "constant/storage-keys";

AddressDelete.propTypes = {
  data: PropTypes.object,
  closeDialog: PropTypes.func,
};

function AddressDelete({ data, closeDialog, handelSubmitSuccess }) {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async () => {
    try {
      await addressApi.remove(data.id);
      if (closeDialog) {
        const email =
          JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "";
        const { data } = await addressApi.getAll({ email });
        closeDialog();
        handelSubmitSuccess(data);
      }
      enqueueSnackbar("Delete my address successfully!", {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.log("Fail to delete address: ", error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div>
      <AddressDeleteForm onSubmit={handleSubmit} closeDialog={closeDialog} />
    </div>
  );
}

export default AddressDelete;
