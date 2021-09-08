import React from 'react';
import '../styles/button.css';

const Button = ({ text, type, clearAll, ...rest }) => {
  return (
    <button
      className={text === 'Add' ? 'btn_add' : 'btn_clear'}
      type={type}
      onClick={clearAll}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
