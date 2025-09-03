import  { useState } from 'react';

const DailyActiveUsersChart = () => {
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    value: 0,
    month: ''
  });
  
  const dauData = [
    { month: 'JAN', value: 35 },
    { month: 'FEB', value: 18 },
    { month: 'MAR', value: 22 },
    { month: 'APR', value: 3 },
    { month: 'MAY', value: 18 },
    { month: 'JUN', value: 10 },
    { month: 'JUL', value: 14 },
    { month: 'AUG', value: 25 },
    { month: 'SEP', value: 16 },
    { month: 'OCT', value: 7 },
    { month: 'NOV', value: 6 },
    { month: 'DEC', value: 14 }
  ];

  const maxValue = Math.max(...dauData.map(d => d.value));

  const handleMouseEnter = (event, data, x, y) => {
    setTooltip({
      show: true,
      x: x,
      y: y - 10,
      value: data.value,
      month: data.month
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, value: 0, month: '' });
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Daily Active Users (DAU) Percentage</h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {['Weekly', 'Monthly', 'Yearly'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeFilter(period)}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors ${
                timeFilter === period
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="h-48 sm:h-64 relative">
        <svg className="w-full h-full" viewBox="0 0 800 250">
          {/* Grid lines */}
          {[0, 10, 20, 30, 40, 50].map((line) => (
            <g key={line}>
              <line
                x1="60"
                y1={230 - (line / 50) * 180}
                x2="780"
                y2={230 - (line / 50) * 180}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
              <text
                x="50"
                y={235 - (line / 50) * 180}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {line}
              </text>
            </g>
          ))}
          
          {/* Bars */}
          {dauData.map((data, index) => {
            const x = 80 + index * 55;
            const barHeight = (data.value / maxValue) * 180;
            
            return (
              <g key={data.month}>
                <rect
                  x={x - 15}
                  y={230 - barHeight}
                  width={30}
                  height={barHeight}
                  fill="#06B6D4"
                  rx="4"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  onMouseEnter={(e) => handleMouseEnter(e, data, x, 230 - barHeight)}
                  onMouseLeave={handleMouseLeave}
                />
                
                {/* Tooltip circle for hovered bar */}
                {tooltip.show && tooltip.month === data.month && (
                  <circle
                    cx={x}
                    cy={230 - barHeight - 20}
                    r="12"
                    fill="#1f2937"
                    stroke="white"
                    strokeWidth="2"
                  />
                )}
                
                {tooltip.show && tooltip.month === data.month && (
                  <text
                    x={x}
                    y={235 - barHeight - 20}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-white"
                  >
                    {data.value}
                  </text>
                )}
                
                <text
                  x={x}
                  y={245}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {data.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

    </div>
  );
};

export default DailyActiveUsersChart;