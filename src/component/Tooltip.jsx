

import React, { useState } from 'react';

const Tooltip = ({ children, content }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="relative inline-block w-full"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute z-50 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap bottom-full left-1/2 transform -translate-x-1/2 mb-1 shadow-lg border border-gray-700">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;