import userApi from 'api/userApi';
import { useSnackbar } from 'notistack';
import React from 'react';
import { jsonToFormData } from 'utils';
import UserEmailForm from '../UserEmailForm';

UserEmail.propTypes = {};

function UserEmail(props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const jsonObject = {
        userRequest: JSON.stringify(values).trim(),
      };
      const data = jsonToFormData(jsonObject);
      const { status, message } = await userApi.update(data);
      if (status === 'OK') {
        enqueueSnackbar('Change information user successfully', {
          variant: 'success',
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(message, { variant: 'error', autoHideDuration: 1000 });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 1000,
      });
    }
  };
  return (
    <div>
      <UserEmailForm onSubmit={handleSubmit} />
    </div>
  );
}

export default UserEmail;
