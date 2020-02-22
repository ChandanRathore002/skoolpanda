import React from 'react';
import PropTypes from 'prop-types';

import './validation.scss';

const FormValidation = ({ children }) => (
  <div className="list">
    <p className="error">
      {children}
    </p>
  </div>
);

FormValidation.propTypes = {
  children: PropTypes.node,
};

export default FormValidation;
