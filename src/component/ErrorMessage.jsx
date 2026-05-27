
import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="bg-red-50 p-6 rounded-lg text-red-800">{message}</div>
  </div>
);

export default ErrorMessage;