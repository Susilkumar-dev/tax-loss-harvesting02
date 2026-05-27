
import React from 'react';
import Tooltip from './Tooltip';
import { formatNumber, formatCurrency, formatFullNumber } from '../utils/formatters';

const HoldingsRow = ({ holding, isSelected, onSelect }) => {
  const gainColor = (gain) => gain > 0 ? 'text-green-400' : gain < 0 ? 'text-red-400' : 'text-gray-400';

  return (
    <tr className="transition-all duration-200 group hover:bg-gray-700/50">
      <td className="px-3 sm:px-4 py-3 sm:py-4">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={(e) => onSelect(holding.coin, e.target.checked)} 
          className="w-4 h-4 text-blue-600 rounded" 
        />
      </td>
      <td className="px-3 sm:px-4 py-3 sm:py-4">
        <Tooltip content={`${holding.coinName} (${holding.coin})`}>
          <div className="flex items-center gap-2 sm:gap-3 cursor-help">
            <img 
              src={holding.logo} 
              alt={holding.coin} 
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" 
              onError={(e) => e.target.src = 'https://via.placeholder.com/32'} 
            />
            <div>
              <div className="font-medium text-white text-sm sm:text-base">{holding.coinName}</div>
              <div className="text-xs text-gray-400">{holding.coin}</div>
            </div>
          </div>
        </Tooltip>
      </td>
      <td className="px-3 sm:px-4 py-3 sm:py-4">
        <Tooltip content={`${formatFullNumber(holding.totalHolding)} ${holding.coin} @ ${formatFullNumber(holding.averageBuyPrice)}`}>
          <div className="cursor-help">
            <div className="font-medium text-white text-sm sm:text-base">{formatNumber(holding.totalHolding)} {holding.coin}</div>
            <div className="text-xs text-gray-400">@ {formatCurrency(holding.averageBuyPrice)}</div>
          </div>
        </Tooltip>
      </td>
      <td className="px-3 sm:px-4 py-3 sm:py-4">
        <Tooltip content={`$${formatFullNumber(holding.currentPrice)}`}>
          <div className="font-medium text-white text-sm sm:text-base cursor-help">{formatCurrency(holding.currentPrice)}</div>
        </Tooltip>
      </td>
      <td className={`px-3 sm:px-4 py-3 sm:py-4 ${gainColor(holding.stcg.gain)}`}>
        <Tooltip content={`${formatFullNumber(holding.stcg.gain)} USD | Balance: ${formatFullNumber(holding.stcg.balance)} ${holding.coin}`}>
          <div className="cursor-help">
            <div className="text-sm sm:text-base">{formatCurrency(holding.stcg.gain)}</div>
            <div className="text-xs text-gray-400">{formatNumber(holding.stcg.balance)} {holding.coin}</div>
          </div>
        </Tooltip>
      </td>
      <td className={`px-3 sm:px-4 py-3 sm:py-4 ${gainColor(holding.ltcg.gain)}`}>
        <Tooltip content={`${formatFullNumber(holding.ltcg.gain)} USD | Balance: ${formatFullNumber(holding.ltcg.balance)} ${holding.coin}`}>
          <div className="cursor-help">
            <div className="text-sm sm:text-base">{formatCurrency(holding.ltcg.gain)}</div>
            <div className="text-xs text-gray-400">{formatNumber(holding.ltcg.balance)} {holding.coin}</div>
          </div>
        </Tooltip>
      </td>
      <td className="px-3 sm:px-4 py-3 sm:py-4">
        {isSelected && (
          <Tooltip content={`Sell ${formatFullNumber(holding.totalHolding)} ${holding.coin}`}>
            <span className="text-blue-400 font-medium text-sm sm:text-base cursor-help">
              {formatNumber(holding.totalHolding)} {holding.coin}
            </span>
          </Tooltip>
        )}
      </td>
    </tr>
  );
};

export default HoldingsRow;