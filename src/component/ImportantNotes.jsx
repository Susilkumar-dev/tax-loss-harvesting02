
import React, { useState } from 'react';

const ImportantNotes = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="mb-4 text-gray-400 italic bg-gray-800 p-2 sm:p-3 rounded border border-gray-700 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between">
        <span className="text-gray-400 italic hover:text-white text-xs sm:text-sm font-medium">ⓘ Important Notes And Disclaimers</span>
        <span className="text-lg">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="mt-3 p-3 sm:p-4 bg-gray-800 rounded-lg text-xs sm:text-sm text-gray-300 space-y-2">
          <p><span className="font-semibold">Price Source Disclaimer:</span> Please note that the current price of your coins may differ from the prices listed on specific exchanges. This is because we use CoinGecko as our default price source for certain exchanges, rather than fetching prices directly from the exchange.</p>
          <p><span className="font-semibold">Country-specific Availability:</span> Tax loss harvesting may not be supported in all countries. We strongly recommend consulting with your local tax advisor or accountant before performing any related actions on your exchange.</p>
          <p><span className="font-semibold">Utilization of Losses:</span> Tax loss harvesting typically allows you to offset capital gains. However, if you have zero or no applicable crypto capital gains, the usability of these harvested losses may be limited. Kindly confirm with your tax advisor how such losses can be applied in your situation.</p>
        </div>
      )}
    </div>
  );
};

export default ImportantNotes;