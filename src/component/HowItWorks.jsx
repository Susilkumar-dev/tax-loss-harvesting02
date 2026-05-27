import React, { useState } from 'react';

const HowItWorks = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <span
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)} 
        className="text-[#0052FF] dark:text-blue-400 cursor-help border-b border-dashed border-[#0052FF] dark:border-blue-400 text-sm sm:text-base font-medium transition-colors"
      >
        How it works?
      </span>
      
      {showTooltip && (
        <div className="absolute top-full left-0 sm:left-1/2 sm:-translate-x-1/2 mt-3 w-72 sm:w-80 p-4 z-[100] animate-in fade-in zoom-in duration-200
          /* Light Theme Styling */
          bg-white text-gray-700 border border-gray-200 shadow-2xl rounded-xl
          /* Dark Theme Styling */
          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:shadow-none
        ">
         
          <div className="absolute -top-1.5 left-6 sm:left-1/2 sm:-translate-x-1/2 w-3 h-3 rotate-45 
            bg-white border-l border-t border-gray-200
            dark:bg-gray-900 dark:border-gray-700
          "></div>
          
          <div className="relative">
            <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">Tax Loss Harvesting</h4>
            <p className="text-xs sm:text-sm leading-relaxed">
              Tax loss harvesting allows you to sell assets at a loss to offset capital gains, reducing your tax liability. Select holdings with losses to see the impact on your after-harvesting gains.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HowItWorks;