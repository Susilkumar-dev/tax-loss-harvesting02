


import React from 'react';
import Tooltip from './Tooltip';
import { formatCurrency, formatFullNumber } from '../utils/formatters';

const CapitalGainsCard = ({ title, stcg, ltcg, realisedGains, variant = 'white', taxSavings }) => {
  const isBlue = variant === 'blue';
  
  
  const containerClass = isBlue 
    ? "bg-blue-600 text-white shadow-xl" 
    : "bg-white dark:bg-[#0b1426] border border-gray-200 dark:border-gray-800 shadow-sm";
  
  const textMuted = isBlue ? "text-blue-100" : "text-gray-500 dark:text-gray-400";
  const textMain = isBlue ? "text-white" : "text-gray-900 dark:text-white";
  const borderClass = isBlue ? "border-blue-400/30" : "border-gray-100 dark:border-gray-800";

  const safeStcg = stcg || { profits: 0, losses: 0, net: 0 };
  const safeLtcg = ltcg || { profits: 0, losses: 0, net: 0 };

  return (
    <div className={`rounded-xl overflow-hidden flex flex-col h-full ${containerClass}`}>
      <div className="p-5 sm:p-6 pb-2">
        <h3 className={`text-lg font-bold mb-6 ${textMain}`}>{title}</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="invisible">Label</div>
          <div className={`${textMuted} text-xs font-medium text-right`}>Short-term</div>
          <div className={`${textMuted} text-xs font-medium text-right`}>Long-term</div>
        </div>

        {/* Profits Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className={`${textMuted} text-sm`}>Profits</div>
          <div className={`${textMain} text-right text-sm font-medium`}>{formatCurrency(safeStcg.profits)}</div>
          <div className={`${textMain} text-right text-sm font-medium`}>{formatCurrency(safeLtcg.profits)}</div>
        </div>

        {/* Losses Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className={`${textMuted} text-sm`}>Losses</div>
          <div className={`${textMain} text-right text-sm font-medium`}>{formatCurrency(-safeStcg.losses)}</div>
          <div className={`${textMain} text-right text-sm font-medium`}>{formatCurrency(-safeLtcg.losses)}</div>
        </div>

        {/* Net Row */}
        <div className={`grid grid-cols-3 gap-4 pt-4 border-t ${borderClass} mb-4`}>
          <div className={`${textMuted} text-sm font-semibold`}>Net Capital Gains</div>
          <div className={`${textMain} text-right text-sm font-bold`}>{formatCurrency(safeStcg.net)}</div>
          <div className={`${textMain} text-right text-sm font-bold`}>{formatCurrency(safeLtcg.net)}</div>
        </div>
      </div>

      {/* Footer Summary */}
      <div className={`mt-auto p-5 sm:p-6 ${isBlue ? 'bg-blue-700/50' : 'bg-gray-50/50 dark:bg-gray-900/30'} border-t ${borderClass}`}>
        <div className="flex justify-between items-center">
          <span className={`${textMuted} text-sm font-medium`}>
            {title.includes('Pre') ? 'Realised Capital Gains:' : 'Effective Capital Gains:'}
          </span>
          <span className={`${textMain} text-2xl font-bold`}>
             {realisedGains < 0 ? `- ${formatCurrency(Math.abs(realisedGains))}` : formatCurrency(realisedGains)}
          </span>
        </div>

        {isBlue && taxSavings > 0 && (
          <div className="mt-4 pt-4 border-t border-blue-400/30 flex items-center gap-2">
             <span className="text-xl">🎉</span>
             <span className="text-sm font-medium text-white">
                You are going to save upto <span className="font-bold"> $ {Math.round(taxSavings)}</span>
             </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CapitalGainsCard;