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
        <div className="absolute z-50 px-2 py-1 mb-2 text-xs font-medium rounded shadow-md border whitespace-nowrap bottom-full left-1/2 -translate-x-1/2 transition-opacity duration-200
          /* Light Theme Styling */
          bg-white text-gray-800 border-gray-200
          /* Dark Theme Styling */
          dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:shadow-none
        ">
          {content}
          
          
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-t-4 border-x-transparent
            /* Light Theme Arrow Color */
            border-t-white
            /* Dark Theme Arrow Color */
            dark:border-t-gray-900
          "></div>
          
          
          <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-gray-200 dark:hidden -z-10"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;