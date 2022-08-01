import userApi from 'api/userApi';
import { useSnackbar } from 'notistack';
import React from 'react';
import { jsonToFormData } from 'utils';
import UserDetailForm from '../UserDetailForm';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateUser } from 'features/Auth/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

UserDetail.propTypes = {
  handelSubmitSuccess: PropTypes.func,
};

function UserDetail(props) {
  const { handelSubmitSuccess } = props;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      const dataUser = {
        fullName: `${values.firstName} ${values.lastName}`,
      };
      const jsonObject = {
        userRequest: JSON.stringify(dataUser).trim(),
      };
      const data = jsonToFormData(jsonObject);
      const { payload } = await dispatch(updateUser(data));
      unwrapResult(payload);
      if (typeof payload.email !== 'undefined') {
        const result = await userApi.getUser();
        handelSubmitSuccess(result.data);
        enqueueSnackbar('Change information user successfully', {
          variant: 'success',
          autoHideDuration: 1000,
        });
      }
      // else {
      //   enqueueSnackbar(message, { variant: 'error', autoHideDuration: 1000 });
      // }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 1000,
      });
    }
  };
  return (
    <div>
      <UserDetailForm onSubmit={handleSubmit} />
    </div>
  );
}

export default UserDetail;
