import React from 'react';

interface CoinChartProps {
  data: number[];
  color?: string;
  isPositive?: boolean;
  height?: number;
  width?: string | number;
  showAxes?: boolean;
}

export const CoinChart: React.FC<CoinChartProps> = ({
  data,
  isPositive = true,
  height = 80,
  showAxes = false,
}) => {
  if (!data || data.length < 2) {
    return <div className="h-16 flex items-center justify-center text-xs text-slate-400">No chart data</div>;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 6;
  const chartHeight = height - padding * 2;
  const chartWidth = 300;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * (chartWidth - padding * 2) + padding;
      const y = height - padding - ((val - min) / range) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const strokeColor = isPositive ? '#16A34A' : '#DC2626';
  const fillColor = isPositive ? 'rgba(22, 163, 74, 0.12)' : 'rgba(220, 38, 38, 0.12)';

  // Build closed area for gradient fill
  const firstX = padding;
  const lastX = chartWidth - padding;
  const closedArea = `${points} ${lastX},${height} ${firstX},${height}`;

  return (
    <div className="w-full overflow-hidden" style={{ minHeight: `${height}px` }}>
      <svg
        viewBox={`0 0 ${chartWidth} ${height}`}
        style={{ width: '100%', height: `${height}px` }}
        preserveAspectRatio="none"
        aria-label="Price trend chart"
      >
        <defs>
          <linearGradient id={`chart-grad-${isPositive ? 'pos' : 'neg'}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Fill area */}
        <polygon points={closedArea} fill={`url(#chart-grad-${isPositive ? 'pos' : 'neg'})`} />

        {/* Trend stroke */}
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>

      {showAxes && (
        <div className="flex justify-between text-[11px] font-mono tabular-nums text-slate-400 mt-1 px-1">
          <span>7D Low: ${min.toLocaleString()}</span>
          <span>7D High: ${max.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};
