import React from 'react';
import '../styles/input.css';

const Input = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className="input_value"
      type="text"
      placeholder="Thing to do..."
    />
  );
};

export default Input;
