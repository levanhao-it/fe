import React from 'react';
import UserPasswordForm from '../UserPasswordForm';

UserPassword.propTypes = {};

function UserPassword(props) {
  const handleSubmit = (values) => {
    console.log('Form Submit:', values);
  };
  return (
    <div>
      <UserPasswordForm onSubmit={handleSubmit} />
    </div>
  );
}

export default UserPassword;
