import React from 'react';
import './SuccessToast.scss';

const SuccessToast = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className='success-toast' role='status' aria-live='polite' onClick={onClose}>
      <span className='check'>?</span>
      <span>{message}</span>
    </div>
  );
};

export default SuccessToast;
