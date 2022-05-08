import React from 'react';
import UserEmailForm from '../UserEmailForm';

UserEmail.propTypes = {};

function UserEmail(props) {
  const handleSubmit = (values) => {
    console.log('Form Submit:', values);
  };
  return (
    <div>
      <UserEmailForm onSubmit={handleSubmit} />
    </div>
  );
}

export default UserEmail;
