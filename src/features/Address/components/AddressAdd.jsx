import React from 'react';
import PropTypes from 'prop-types';
import AddressAddForm from './AddressAddForm';
import { useSnackbar } from 'notistack';
import addressApi from 'api/addressApi';
import StorageKeys from 'constant/storage-keys';

AddressAdd.propTypes = {
  closeDialog: PropTypes.func,
  handelSubmitSuccess: PropTypes.func,
};

function AddressAdd({ closeDialog, handelSubmitSuccess }) {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      await addressApi.add(values);
      if (closeDialog) {
        const email = JSON.parse(localStorage.getItem(StorageKeys.USER)).email || '';
        const { data } = await addressApi.getAll({ email });
        closeDialog();
        handelSubmitSuccess(data);
      }
      enqueueSnackbar('Add your address successfully!', {
        variant: 'success',
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.log('Fail to add your address: ', error.message);
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 1000,
      });
    }
  };
  return (
    <div>
      <AddressAddForm onSubmit={handleSubmit} closeDialog={closeDialog} />
    </div>
  );
}

export default AddressAdd;
