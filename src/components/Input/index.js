import React from 'react';

const Input = ({
  type,
  id,
  name,
  placeholder,
  onChange,
  onBlur,
  value,
  className,
}) => (
  <input
    type={type}
    id={id}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    onBlur={onBlur}
    value={value}
    className={className}
    autoComplete="off"
  />
);

export default Input;