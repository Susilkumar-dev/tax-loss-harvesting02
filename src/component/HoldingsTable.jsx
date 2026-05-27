
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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[800px] lg:min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-900">
          <tr>
            <th className="w-12 px-3 sm:px-4 py-3 text-left">
              <input 
                type="checkbox" 
                checked={allSelected} 
                onChange={(e) => onSelectAll(e.target.checked)} 
                className="w-4 h-4 text-blue-600 rounded" 
              />
            </th>
            <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Asset</th>
            <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Holdings / Avg Buy Price</th>
            <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Current Price</th>
            <th 
              className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase cursor-pointer hover:bg-gray-800"
              onClick={() => requestSort('stcg')}
            >
              Short-Term {sortConfig.key === 'stcg' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase cursor-pointer hover:bg-gray-800"
              onClick={() => requestSort('ltcg')}
            >
              Long-Term {sortConfig.key === 'ltcg' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Amount to Sell</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
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
        <div className="px-3 sm:px-4 py-3 border-t border-gray-700 text-left">
          <button onClick={() => setShowAll(!showAll)} className="text-blue-400 hover:text-blue-300 text-sm">
            {showAll ? 'Show less' : 'View all'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;