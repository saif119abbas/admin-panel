import  { useState } from 'react';

const LoginFrequencyChart= () => {
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  const loginData = [
    { month: 'JAN', value: 22 },
    { month: 'FEB', value: 26 },
    { month: 'MAR', value: 35 },
    { month: 'APR', value: 21 },
    { month: 'MAY', value: 20 },
    { month: 'JUN', value: 30 },
    { month: 'JUL', value: 30 },
    { month: 'AUG', value: 21 },
    { month: 'SEP', value: 30 },
    { month: 'OCT', value: 38 },
    { month: 'NOV', value: 40 },
    { month: 'DEC', value: 26 }
  ];

  const maxValue = Math.max(...loginData.map(d => d.value));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Login Frequency</h3>
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
        <svg className="w-full h-full" viewBox="0 0 800 200">
          <defs>
            <linearGradient id="loginGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 10, 20, 30, 40, 50].map((line) => (
            <line
              key={line}
              x1="0"
              y1={200 - (line / 50) * 160}
              x2="800"
              y2={200 - (line / 50) * 160}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Area fill */}
          <path
            d={`M 0 ${200 - (loginData[0].value / maxValue) * 160} ${loginData.map((point, index) => 
              `L ${(index / (loginData.length - 1)) * 800} ${200 - (point.value / maxValue) * 160}`
            ).join(' ')} L 800 200 L 0 200 Z`}
            fill="url(#loginGradient)"
          />
          
          {/* Line */}
          <polyline
            points={loginData.map((point, index) => 
              `${(index / (loginData.length - 1)) * 800},${200 - (point.value / maxValue) * 160}`
            ).join(' ')}
            fill="none"
            stroke="#06B6D4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {loginData.map((point, index) => (
            <g key={index}>
              <circle
                cx={(index / (loginData.length - 1)) * 800}
                cy={200 - (point.value / maxValue) * 160}
                r="4"
                fill="#06B6D4"
                stroke="white"
                strokeWidth="2"
                className="hover:r-6 transition-all cursor-pointer"
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              
              {/* Tooltip circle */}
              {hoveredPoint?.month === point.month && (
                <>
                  <circle
                    cx={(index / (loginData.length - 1)) * 800}
                    cy={200 - (point.value / maxValue) * 160 - 25}
                    r="12"
                    fill="#1f2937"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={(index / (loginData.length - 1)) * 800}
                    y={205 - (point.value / maxValue) * 160 - 25}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-white"
                  >
                    {point.value}
                  </text>
                </>
              )}
            </g>
          ))}
          
          {/* X-axis labels */}
          {loginData.map((point, index) => (
            <text
              key={point.month}
              x={(index / (loginData.length - 1)) * 800}
              y={190}
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {point.month}
            </text>
          ))}
          
          {/* Y-axis labels */}
          {[50, 40, 30, 20, 10, 0].map((value) => (
            <text
              key={value}
              x={-10}
              y={200 - (value / 50) * 160 + 4}
              textAnchor="end"
              className="text-xs fill-gray-500"
            >
              {value}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default LoginFrequencyChart;