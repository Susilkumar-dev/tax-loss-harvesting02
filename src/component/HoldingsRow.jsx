import React from 'react';
import Tooltip from './Tooltip';
import { formatNumber, formatCurrency, formatFullNumber } from '../utils/formatters';

const HoldingsRow = ({ holding, isSelected, onSelect }) => {
  const gainColor = (gain) => gain > 0 ? 'text-[#10B981]' : gain < 0 ? 'text-[#EF4444]' : 'text-gray-400';
  const totalValue = holding.totalHolding * (holding.currentPrice || 0);

  return (
    <tr className={`transition-colors duration-150 group 
      ${isSelected 
        ? 'bg-[#F0F7FF] dark:bg-blue-900/20' 
        : 'hover:bg-[#F9FAFB] dark:hover:bg-gray-800/50'
      }`}>
      
      
      <td className="px-4 py-4 align-middle">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={(e) => onSelect(holding.coin, e.target.checked)} 
          className="w-4 h-4 text-[#0052FF] rounded border-gray-300 accent-[#0052FF] cursor-pointer" 
        />
      </td>

      
      <td className="px-4 py-4">
        <Tooltip content={`${holding.coinName} (${holding.coin})`}>
          <div className="flex items-center gap-3 cursor-help">
            <img 
              src={holding.logo} 
              alt={holding.coin} 
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800" 
              onError={(e) => e.target.src = 'https://via.placeholder.com/32'} 
            />
            <div className="min-w-0">
              <div className="font-bold text-gray-900 dark:text-white text-[14px] leading-tight truncate">
                {holding.coinName}
              </div>
              <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-tight">
                {holding.coin}
              </div>
            </div>
          </div>
        </Tooltip>
      </td>

      <td className="px-4 py-4 text-center">
        <Tooltip content={`${formatFullNumber(holding.totalHolding)} ${holding.coin} @ ${formatFullNumber(holding.averageBuyPrice)}`}>
          <div className="cursor-help">
            <div className="font-bold text-gray-900 dark:text-white text-[14px]">
              {formatNumber(holding.totalHolding)} {holding.coin}
            </div>
            <div className="text-[11px] font-medium text-gray-400 dark:text-gray-500">
              @ {formatCurrency(holding.averageBuyPrice)}
            </div>
          </div>
        </Tooltip>
      </td>

      
      <td className="px-4 py-4 text-right">
        <div className="font-bold text-gray-900 dark:text-white text-[14px]">
          {formatCurrency(totalValue)}
        </div>
      </td>

      
      <td className={`px-4 py-4 text-right ${gainColor(holding.stcg.gain)}`}>
        <Tooltip content={`${formatFullNumber(holding.stcg.gain)} USD | Balance: ${formatFullNumber(holding.stcg.balance)} ${holding.coin}`}>
          <div className="cursor-help">
            <div className="text-[14px] font-bold">
              {holding.stcg.gain > 0 ? '+' : ''}{formatCurrency(holding.stcg.gain)}
            </div>
            <div className="text-[11px] font-medium text-gray-400 dark:text-gray-500 lowercase">
              {formatNumber(holding.stcg.balance)} {holding.coin}
            </div>
          </div>
        </Tooltip>
      </td>

   
      <td className={`px-4 py-4 text-right ${gainColor(holding.ltcg.gain)}`}>
        <Tooltip content={`${formatFullNumber(holding.ltcg.gain)} USD | Balance: ${formatFullNumber(holding.ltcg.balance)} ${holding.coin}`}>
          <div className="cursor-help">
            <div className="text-[14px] font-bold">
              {holding.ltcg.gain > 0 ? '+' : ''}{formatCurrency(holding.ltcg.gain)}
            </div>
            <div className="text-[11px] font-medium text-gray-400 dark:text-gray-500 lowercase">
              {formatNumber(holding.ltcg.balance)} {holding.coin}
            </div>
          </div>
        </Tooltip>
      </td>

      
      <td className="px-4 py-4 text-right">
        {isSelected ? (
          <Tooltip content={`Sell ${formatFullNumber(holding.totalHolding)} ${holding.coin}`}>
            <span className="text-[#0052FF] dark:text-blue-400 font-bold text-[13px] cursor-help">
              {formatNumber(holding.totalHolding)} {holding.coin}
            </span>
          </Tooltip>
        ) : (
          <span className="text-gray-300 dark:text-gray-700 font-bold text-[14px]">-</span>
        )}
      </td>
    </tr>
  );
};

export default HoldingsRow;