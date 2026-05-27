import React, { useState } from 'react';
import HoldingsRow from './HoldingsRow';

const HoldingsTable = ({ holdings, selectedHoldings, onSelectHolding, onSelectAll }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showAll, setShowAll] = useState(false);

  const sortedHoldings = React.useMemo(() => {
    if (!sortConfig.key) return holdings;
    const sorted = [...holdings];
    sorted.sort((a, b) => {
      let aVal, bVal;
      if (sortConfig.key === 'stcg') {
        aVal = a.stcg.gain;
        bVal = b.stcg.gain;
      } else if (sortConfig.key === 'ltcg') {
        aVal = a.ltcg.gain;
        bVal = b.ltcg.gain;
      } else {
        return 0;
      }
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [holdings, sortConfig]);

  const displayedHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 5);
  const allSelected = holdings.length > 0 && holdings.every(h => selectedHoldings.has(h.coin));

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return <span className="inline-block ml-1 opacity-20">↕</span>;
    }
    return <span className="inline-block ml-1 text-[#0052FF]">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
      <table className="w-full table-fixed border-collapse min-w-[900px]">
        <colgroup>
          <col className="w-[48px]" />
          <col className="w-[180px]" />
          <col className="w-[180px]" />
          <col className="w-[160px]" />
          <col className="w-[150px]" />
          <col className="w-[150px]" />
          <col className="w-[140px]" />
        </colgroup>
        
        <thead className="bg-[#F9FAFB] dark:bg-gray-800/50 border-b border-[#E5E7EB] dark:border-gray-700">
          <tr>
            <th className="px-4 py-4 text-left">
              <input 
                type="checkbox" 
                checked={allSelected} 
                onChange={(e) => onSelectAll(e.target.checked)} 
                className="w-4 h-4 text-[#0052FF] rounded border-gray-300 focus:ring-[#0052FF] accent-[#0052FF] cursor-pointer" 
              />
            </th>
            <th className="px-4 py-4 text-left text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
              Asset
            </th>
            <th className="px-4 py-4 text-center">
              <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Holdings</div>
              <div className="text-[10px] font-normal text-gray-400 lowercase leading-none">Current Market Rate</div>
            </th>
            <th className="px-4 py-4 text-right text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
              Total Current Value
            </th>
            <th 
              className="px-4 py-4 text-right text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase cursor-pointer hover:text-[#0052FF] transition-colors group"
              onClick={() => requestSort('stcg')}
            >
              Short-Term {renderSortIndicator('stcg')}
            </th>
            <th 
              className="px-4 py-4 text-right text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase cursor-pointer hover:text-[#0052FF] transition-colors group"
              onClick={() => requestSort('ltcg')}
            >
              Long-Term {renderSortIndicator('ltcg')}
            </th>
            <th className="px-4 py-4 text-right text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
              Amount to Sell
            </th>
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
          {displayedHoldings.map(holding => (
            <HoldingsRow 
              key={holding.coin} 
              holding={holding} 
              isSelected={selectedHoldings.has(holding.coin)} 
              onSelect={onSelectHolding} 
            />
          ))}
        </tbody>
      </table>

      {holdings.length > 5 && (
        <div className="px-6 py-4 border-t border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-gray-900">
          <button 
            onClick={() => setShowAll(!showAll)} 
            className="text-[#0052FF] dark:text-blue-400 hover:underline text-[14px] font-bold transition-all"
          >
            {showAll ? 'Show less' : 'View all'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;