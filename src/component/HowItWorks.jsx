
import React, { useState } from 'react';

const HowItWorks = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <span
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="text-blue-400 cursor-help border-b border-dashed border-blue-400 text-sm sm:text-base"
      >
        How it works?
      </span>
      
      {showTooltip && (
        <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-gray-800 rounded-lg shadow-xl p-3 z-10 text-xs sm:text-sm text-gray-300 border border-gray-700">
          <p>Tax loss harvesting allows you to sell assets at a loss to offset capital gains, reducing your tax liability. Select holdings with losses to see the impact on your after-harvesting gains.</p>
        </div>
      )}
    </div>
  );
};

export default HowItWorks;