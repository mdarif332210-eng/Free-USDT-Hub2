/**
 * Utility functions for currency, market capitalization, view counts, and rate calculations.
 */

export function formatUsd(val: number | null | undefined, maxDecimals: number = 2): string {
  if (val === null || val === undefined || isNaN(val)) {
    return '$0.00';
  }

  if (val < 0.0001 && val > 0) {
    return `$${val.toFixed(6)}`;
  }
  if (val < 1 && val > 0) {
    return `$${val.toFixed(4)}`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Math.min(2, maxDecimals),
    maximumFractionDigits: maxDecimals,
  }).format(val);
}

export function formatCompactUsd(val: number | null | undefined): string {
  if (!val || isNaN(val)) return '$0';
  if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
  if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(2)}K`;
  return formatUsd(val, 2);
}

export function formatPercent(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return '0.00%';
  const prefix = val > 0 ? '+' : '';
  return `${prefix}${val.toFixed(2)}%`;
}

export function formatViews(count: number | null | undefined): string {
  if (!count || count < 0) return '0 views';
  if (count === 1) return '1 view';
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M views`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K views`;
  return `${count.toLocaleString('en-US')} views`;
}

export function sanitizeHtmlText(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
