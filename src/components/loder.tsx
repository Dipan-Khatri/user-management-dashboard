import React from 'react';
import './Loader.css'; // Import the CSS file

export const Loader: React.FC = () => {
  return (
    <div className="container">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};
