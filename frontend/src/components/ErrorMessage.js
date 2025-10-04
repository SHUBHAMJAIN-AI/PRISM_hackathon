import React from 'react';

function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="error-container">
      <div className="error-message">
        <span className="error-icon">⚠️</span>
        <p>{message}</p>
        <button className="error-dismiss" onClick={onDismiss}>
          ✕
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;
