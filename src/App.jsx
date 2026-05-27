
import React, { useState, useEffect } from 'react';
import CapitalGainsCard from './component/CapitalGainsCard';
import HoldingsTable from './component/HoldingsTable';
import LoadingSpinner from './component/LoadingSpinner';
import ErrorMessage from './component/ErrorMessage';
import HowItWorks from './component/HowItWorks';
import ImportantNotes from './component/ImportantNotes';
import { fetchCapitalGains, fetchHoldings } from './services/api';

function App() {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null);
  const [selectedHoldings, setSelectedHoldings] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [h, c] = await Promise.all([fetchHoldings(), fetchCapitalGains()]);
        setHoldings(h);
        setCapitalGains(c);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const calculatePostHarvesting = () => {
    if (!capitalGains) return null;
    let stcgProfits = capitalGains.capitalGains.stcg.profits;
    let stcgLosses = capitalGains.capitalGains.stcg.losses;
    let ltcgProfits = capitalGains.capitalGains.ltcg.profits;
    let ltcgLosses = capitalGains.capitalGains.ltcg.losses;

    holdings.forEach(h => {
      if (selectedHoldings.has(h.coin)) {
        if (h.stcg.gain > 0) stcgProfits += h.stcg.gain;
        else stcgLosses += Math.abs(h.stcg.gain);
        if (h.ltcg.gain > 0) ltcgProfits += h.ltcg.gain;
        else ltcgLosses += Math.abs(h.ltcg.gain);
      }
    });

    const netStcg = stcgProfits - stcgLosses;
    const netLtcg = ltcgProfits - ltcgLosses;
    const realised = netStcg + netLtcg;
    return {
      stcg: { profits: stcgProfits, losses: stcgLosses, net: netStcg },
      ltcg: { profits: ltcgProfits, losses: ltcgLosses, net: netLtcg },
      realisedGains: realised
    };
  };

  const pre = capitalGains ? {
    stcg: { profits: capitalGains.capitalGains.stcg.profits, losses: capitalGains.capitalGains.stcg.losses, net: capitalGains.capitalGains.stcg.profits - capitalGains.capitalGains.stcg.losses },
    ltcg: { profits: capitalGains.capitalGains.ltcg.profits, losses: capitalGains.capitalGains.ltcg.losses, net: capitalGains.capitalGains.ltcg.profits - capitalGains.capitalGains.ltcg.losses },
    realisedGains: (capitalGains.capitalGains.stcg.profits - capitalGains.capitalGains.stcg.losses) + (capitalGains.capitalGains.ltcg.profits - capitalGains.capitalGains.ltcg.losses)
  } : null;

  const post = calculatePostHarvesting();
  const taxSavings = pre && post ? pre.realisedGains - post.realisedGains : 0;

  const handleSelect = (coin, selected) => {
    const newSet = new Set(selectedHoldings);
    selected ? newSet.add(coin) : newSet.delete(coin);
    setSelectedHoldings(newSet);
  };

  const handleSelectAll = (selected) => {
    if (selected) setSelectedHoldings(new Set(holdings.map(h => h.coin)));
    else setSelectedHoldings(new Set());
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-900 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Tax Optimisation</h1>
          <HowItWorks />
        </div>

        <ImportantNotes />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-8">
          <CapitalGainsCard 
            title="Pre Harvesting" 
            stcg={pre?.stcg} 
            ltcg={pre?.ltcg} 
            realisedGains={pre?.realisedGains} 
            variant="dark" 
          />
          <CapitalGainsCard 
            title="After Harvesting" 
            stcg={post?.stcg} 
            ltcg={post?.ltcg} 
            realisedGains={post?.realisedGains} 
            variant="blue" 
            taxSavings={taxSavings > 0 ? taxSavings : undefined} 
          />
        </div>

        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-700">
            <h2 className="text-base sm:text-lg font-semibold text-white">Holdings</h2>
          </div>
          <HoldingsTable 
            holdings={holdings} 
            selectedHoldings={selectedHoldings} 
            onSelectHolding={handleSelect} 
            onSelectAll={handleSelectAll} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;