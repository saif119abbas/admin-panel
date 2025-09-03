import  { useState } from 'react';

const ChurnRateChart = () => {
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    value: 0,
    month: ''
  });
  
  const churnData = [
    { month: 'JAN', value: 2 },
    { month: 'FEB', value: 1 },
    { month: 'MAR', value: 1.5 },
    { month: 'APR', value: 1.3 },
    { month: 'MAY', value: 1 },
    { month: 'JUN', value: 3.5 },
    { month: 'JUL', value: 1.5 },
    { month: 'AUG', value: 2.5 },
    { month: 'SEP', value: 1.8 },
    { month: 'OCT', value: 1.7 },
    { month: 'NOV', value: 3.2 },
    { month: 'DEC', value: 2.8 }
  ];

  const maxValue = Math.max(...churnData.map(d => d.value));

  const handleMouseEnter =(data,x,y) => {
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Users Churn Rate Tracking</h3>
        <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
          {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((period) => (
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
        
        {/* Mobile filter dropdown */}
        <select 
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="sm:hidden text-xs border border-gray-300 rounded-md px-2 py-1 bg-white"
        >
          {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((period) => (
            <option key={period} value={period}>{period}</option>
          ))}
        </select>
      </div>

      <div className="h-48 sm:h-64 relative">
        <svg className="w-full h-full" viewBox="0 0 800 200">
          <defs>
            <linearGradient id="churnGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 1, 2, 3, 4, 5].map((line) => (
            <line
              key={line}
              x1="0"
              y1={200 - (line * 40)}
              x2="800"
              y2={200 - (line * 40)}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Area fill */}
          <path
            d={`M 0 ${200 - (churnData[0].value / maxValue) * 160} ${churnData.map((point, index) => 
              `L ${(index / (churnData.length - 1)) * 800} ${200 - (point.value / maxValue) * 160}`
            ).join(' ')} L 800 200 L 0 200 Z`}
            fill="url(#churnGradient)"
          />
          
          {/* Line */}
          <polyline
            points={churnData.map((point, index) => 
              `${(index / (churnData.length - 1)) * 800},${200 - (point.value / maxValue) * 160}`
            ).join(' ')}
            fill="none"
            stroke="#06B6D4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {churnData.map((point, index) => (
            <circle
              key={index}
              cx={(index / (churnData.length - 1)) * 800}
              cy={200 - (point.value / maxValue) * 160}
              r="5"
              fill="#06B6D4"
              stroke="white"
              strokeWidth="2"
              className="hover:r-7 transition-all cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(e, point, (index / (churnData.length - 1)) * 800, 200 - (point.value / maxValue) * 160)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
          
          {/* Peak indicator */}
          <circle
            cx={(5 / (churnData.length - 1)) * 800}
            cy={200 - (3.5 / maxValue) * 160}
            r="8"
            fill="#1f2937"
            stroke="white"
            strokeWidth="2"
          />
          <text
            x={(5 / (churnData.length - 1)) * 800}
            y={200 - (3.5 / maxValue) * 160 - 15}
            textAnchor="middle"
            className="text-xs font-semibold fill-white"
          >
            3
          </text>
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-2 overflow-x-auto">
          {churnData.map((point) => (
            <span key={point.month} className="text-xs text-gray-500 flex-shrink-0">
              {point.month}
            </span>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-6 sm:-ml-8">
          {[5, 4, 3, 2, 1, 0].map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-center mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
          <span className="text-sm text-gray-600">User Churn Rate (%)</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            left: `${(tooltip.x / 800) * 100}%`,
            top: `${((tooltip.y + 40) / 200) * 100}%`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="bg-black text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
            <div className="text-center">
              <div className="font-semibold">{tooltip.month}</div>
              <div>{tooltip.value}%</div>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChurnRateChart;