import React from 'react';

export default function Message({ children, type }) {
  return (
    <div className={`react-pdf__message react-pdf__message--${type}`}>
      {children}
    </div>
  );
}
