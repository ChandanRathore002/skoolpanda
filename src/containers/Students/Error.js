import React from 'react';

const Error = ({ touched, message }) => {
  if (!touched) {
    return null;
  }
  if (message) {
    return <div className="error-message">{message}</div>
  }
  return null;
}

export default Error;