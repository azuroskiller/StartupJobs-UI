//Button file

import React from 'react';
import '../css/Button.css';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test', 'btn--delete', 'btn--edit', 'btn--forgot'];
const SIZES = ['btn--medium', 'btn--large','btn--small'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
  );
};