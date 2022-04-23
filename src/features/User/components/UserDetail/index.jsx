import React from 'react';
import UserDetailForm from '../UserDetailForm';

UserDetail.propTypes = {};

function UserDetail(props) {
  const handleSubmit = (values) => {
    console.log('Form Submit:', values);
  };
  return (
    <div>
      <UserDetailForm onSubmit={handleSubmit} />
    </div>
  );
}

export default UserDetail;
