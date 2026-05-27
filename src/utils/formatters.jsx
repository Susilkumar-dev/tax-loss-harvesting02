
export const formatNumber = (num) => {
  if (num === undefined) return '0';
  if (Math.abs(num) > 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (Math.abs(num) > 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
};

export const formatCurrency = (num) => {
  if (num === undefined || num === null) return '$0.00';
  const abs = Math.abs(num);
  let formatted;
  if (abs >= 1e6) formatted = `$${(abs / 1e6).toFixed(2)}M`;
  else if (abs >= 1e3) formatted = `$${(abs / 1e3).toFixed(2)}K`;
  else formatted = `$${abs.toFixed(2)}`;
  return num < 0 ? `-${formatted}` : formatted;
};

export const formatFullNumber = (num) => {
  if (num === undefined) return '0';
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 });
};