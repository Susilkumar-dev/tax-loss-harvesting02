import React, { useState } from 'react';

const ImportantNotes = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`
        mb-6 transition-all duration-300 ease-in-out cursor-pointer
        /* Glassmorphism: Light Mode (Slightly more opaque) | Dark Mode (Subtle) */
        bg-blue-50/60 dark:bg-blue-500/5 backdrop-blur-md 
        /* Blue Border */
        border border-blue-400/40 dark:border-blue-500/30 hover:border-blue-500/60 
        rounded-xl shadow-sm dark:shadow-lg dark:shadow-blue-500/5
      `}
      onClick={() => setIsOpen(!isOpen)}
    >
      
      <div className="flex items-center justify-between p-4 sm:p-5">
        <div className="flex items-center gap-3">
          
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
            <span className="text-sm font-bold">i</span>
          </div>
          <span className="text-gray-900 dark:text-blue-100/80 text-sm sm:text-base font-bold tracking-wide">
            Important Notes & Disclaimers
          </span>
        </div>
        
        <span className={`text-blue-600 dark:text-blue-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </div>
      
     
      <div className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-5 border-t border-blue-500/10 mt-1 pt-5">
          
         
          <div className="flex gap-4">
            <div className="w-1.5 h-auto bg-blue-500/30 dark:bg-blue-500/40 rounded-full shrink-0" />
            <p className="text-xs sm:text-sm text-gray-800 dark:text-blue-100/70 leading-relaxed">
              <span className="font-extrabold text-blue-700 dark:text-blue-300 uppercase text-[10px] tracking-wider block mb-1">
                Price Source Disclaimer
              </span>
              Please note that the current price of your coins may differ from the prices listed on specific exchanges. This is because we use CoinGecko as our default price source for certain exchanges, rather than fetching prices directly from the exchange.
            </p>
          </div>

          
          <div className="flex gap-4">
            <div className="w-1.5 h-auto bg-blue-500/30 dark:bg-blue-500/40 rounded-full shrink-0" />
            <p className="text-xs sm:text-sm text-gray-800 dark:text-blue-100/70 leading-relaxed">
              <span className="font-extrabold text-blue-700 dark:text-blue-300 uppercase text-[10px] tracking-wider block mb-1">
                Country-specific Availability
              </span>
              Tax loss harvesting may not be supported in all countries. We strongly recommend consulting with your local tax advisor or accountant before performing any related actions on your exchange.
            </p>
          </div>

          
          <div className="flex gap-4">
            <div className="w-1.5 h-auto bg-blue-500/30 dark:bg-blue-500/40 rounded-full shrink-0" />
            <p className="text-xs sm:text-sm text-gray-800 dark:text-blue-100/70 leading-relaxed">
              <span className="font-extrabold text-blue-700 dark:text-blue-300 uppercase text-[10px] tracking-wider block mb-1">
                Utilization of Losses
              </span>
              Tax loss harvesting typically allows you to offset capital gains. However, if you have zero or no applicable crypto capital gains, the usability of these harvested losses may be limited.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ImportantNotes;