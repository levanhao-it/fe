import React from 'react';
import PropTypes from 'prop-types';
import AddressEditForm from './AddressEditForm';
import { useSnackbar } from 'notistack';
import addressApi from 'api/addressApi';
import StorageKeys from 'constant/storage-keys';

AddressEdit.propTypes = {
  closeDialog: PropTypes.func,
  handelSubmitSuccess: PropTypes.func,
};

function AddressEdit({ data, closeDialog, handelSubmitSuccess }) {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (id, values) => {
    try {
      await addressApi.update(id, values);

      if (closeDialog) {
        const email = JSON.parse(localStorage.getItem(StorageKeys.USER)).email || '';
        const { data } = await addressApi.getAll({ email });
        closeDialog();
        handelSubmitSuccess(data);
      }
      enqueueSnackbar('Edit your address successfully!', {
        variant: 'success',
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.log('Fail to edit your address: ', error.message);
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div>
      <AddressEditForm onSubmit={handleSubmit} data={data} closeDialog={closeDialog} />
    </div>
  );
}

export default AddressEdit;
