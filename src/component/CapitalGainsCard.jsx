
import React from 'react';
import Tooltip from './Tooltip';
import { formatCurrency, formatFullNumber } from '../utils/formatters';

const CapitalGainsCard = ({ title, stcg, ltcg, realisedGains, variant = 'dark', taxSavings }) => {
  const isDark = variant === 'dark';
  const bg = isDark ? 'bg-gray-900' : 'bg-blue-600';
  const border = isDark ? 'border-gray-700' : 'border-blue-500';
  const textMuted = isDark ? 'text-gray-400' : 'text-blue-100';

  const safeStcg = stcg || { profits: 0, losses: 0, net: 0 };
  const safeLtcg = ltcg || { profits: 0, losses: 0, net: 0 };

  return (
    <div className={`rounded-xl ${bg} border ${border} overflow-hidden shadow-lg`}>
      <div className="px-4 sm:px-6 py-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
      </div>

      <div className="p-4 sm:p-6 pt-0">
        
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
          <div className={textMuted}></div>
          <div className={`${textMuted} font-medium text-right text-xs sm:text-sm`}>Short-term</div>
          <div className={`${textMuted} font-medium text-right text-xs sm:text-sm`}>Long-term</div>
        </div>

        
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3">
          <div className={`${textMuted} text-sm sm:text-base`}>Profits</div>
          <Tooltip content={`Profit (STCG): $${formatFullNumber(safeStcg.profits)}`}>
            <div className="text-white text-right font-medium text-sm sm:text-base cursor-help">
              {formatCurrency(safeStcg.profits)}
            </div>
          </Tooltip>
          <Tooltip content={`Profit (LTCG): $${formatFullNumber(safeLtcg.profits)}`}>
            <div className="text-white text-right font-medium text-sm sm:text-base cursor-help">
              {formatCurrency(safeLtcg.profits)}
            </div>
          </Tooltip>
        </div>

        
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3">
          <div className={`${textMuted} text-sm sm:text-base`}>Losses</div>
          <Tooltip content={`Loss (STCG): $${formatFullNumber(safeStcg.losses)}`}>
            <div className="text-white text-right font-medium text-sm sm:text-base cursor-help">
              {formatCurrency(-safeStcg.losses)}
            </div>
          </Tooltip>
          <Tooltip content={`Loss (LTCG): $${formatFullNumber(safeLtcg.losses)}`}>
            <div className="text-white text-right font-medium text-sm sm:text-base cursor-help">
              {formatCurrency(-safeLtcg.losses)}
            </div>
          </Tooltip>
        </div>

      
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-gray-700/50">
          <div className={`${textMuted} font-semibold text-sm sm:text-base`}>Net Capital Gains</div>
          <Tooltip content={`Net STCG: $${formatFullNumber(safeStcg.net)}`}>
            <div className="text-white text-right font-bold text-sm sm:text-base cursor-help">
              {formatCurrency(safeStcg.net)}
            </div>
          </Tooltip>
          <Tooltip content={`Net LTCG: $${formatFullNumber(safeLtcg.net)}`}>
            <div className="text-white text-right font-bold text-sm sm:text-base cursor-help">
              {formatCurrency(safeLtcg.net)}
            </div>
          </Tooltip>
        </div>
      </div>

     
      <div className={`px-4 sm:px-6 py-4 ${isDark ? 'bg-gray-800' : 'bg-blue-700'}`}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span className={`${textMuted} font-medium text-sm sm:text-base`}>
            {title === 'Pre Harvesting' ? 'Realised Capital Gains:' : 'Effective Capital Gains:'}
          </span>
          <Tooltip content={`Total realised gains: $${formatFullNumber(realisedGains)}`}>
            <span className="text-white text-lg sm:text-xl font-bold cursor-help">
              {formatCurrency(realisedGains)}
            </span>
          </Tooltip>
        </div>
        {taxSavings > 0 && (
          <div className="mt-3 pt-3 border-t border-blue-500">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-blue-100 font-medium text-sm sm:text-base">Your taxable capital gains are reduced by:</span>
              <Tooltip content={`Tax savings: $${formatFullNumber(taxSavings)}`}>
                <span className="text-white text-base sm:text-lg font-bold cursor-help">
                  {formatCurrency(taxSavings)}
                </span>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CapitalGainsCard;