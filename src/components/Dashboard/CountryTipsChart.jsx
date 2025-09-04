import  { useState } from 'react';

const CountryTipsChart = () => {
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  const countryData = [
    { month: 'JAN', uae: 250, usa: 200 },
    { month: 'FEB', uae: 280, usa: 220 },
    { month: 'MAR', uae: 200, usa: 180 },
    { month: 'APR', uae: 190, usa: 170 },
    { month: 'MAY', uae: 100, usa: 150 },
    { month: 'JUN', uae: 350, usa: 300 },
    { month: 'JUL', uae: 150, usa: 130 },
    { month: 'AUG', uae: 200, usa: 180 },
    { month: 'SEP', uae: 180, usa: 160 },
    { month: 'OCT', uae: 200, usa: 180 },
    { month: 'NOV', uae: 100, usa: 90 },
    { month: 'DEC', uae: 300, usa: 280 }
  ];

  const maxValue = Math.max(...countryData.flatMap(d => [d.uae, d.usa]));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Tips Received by Country</h3>
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

      <div className="h-48 sm:h-64 relative overflow-x-auto">
        <svg className="w-full h-full min-w-[600px] sm:min-w-0" viewBox="0 0 800 200">
          <defs>
            <linearGradient id="uaeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="usaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 100, 200, 300, 400, 500].map((line) => (
            <line
              key={line}
              x1="0"
              y1={200 - (line / maxValue) * 160}
              x2="800"
              y2={200 - (line / maxValue) * 160}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* UAE Area */}
          <path
            d={`M 0 ${200 - (countryData[0].uae / maxValue) * 160} ${countryData.map((point, index) => 
              `L ${(index / (countryData.length - 1)) * 800} ${200 - (point.uae / maxValue) * 160}`
            ).join(' ')} L 800 200 L 0 200 Z`}
            fill="url(#uaeGradient)"
          />
          
          {/* USA Area */}
          <path
            d={`M 0 ${200 - (countryData[0].usa / maxValue) * 160} ${countryData.map((point, index) => 
              `L ${(index / (countryData.length - 1)) * 800} ${200 - (point.usa / maxValue) * 160}`
            ).join(' ')} L 800 200 L 0 200 Z`}
            fill="url(#usaGradient)"
          />
          
          {/* UAE Line */}
          <polyline
            points={countryData.map((point, index) => 
              `${(index / (countryData.length - 1)) * 800},${200 - (point.uae / maxValue) * 160}`
            ).join(' ')}
            fill="none"
            stroke="#06B6D4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* USA Line */}
          <polyline
            points={countryData.map((point, index) => 
              `${(index / (countryData.length - 1)) * 800},${200 - (point.usa / maxValue) * 160}`
            ).join(' ')}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* UAE Data points */}
          {countryData.map((point, index) => (
            <g key={`uae-${index}`}>
              <circle
                cx={(index / (countryData.length - 1)) * 800}
                cy={200 - (point.uae / maxValue) * 160}
                r="4"
                fill="#06B6D4"
                stroke="white"
                strokeWidth="2"
                className="hover:r-6 transition-all cursor-pointer"
                onMouseEnter={() => setHoveredPoint({ month: point.month, value: point.uae, country: 'UAE' })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              
              {/* Tooltip circle */}
              {hoveredPoint?.month === point.month && hoveredPoint?.country === 'UAE' && (
                <>
                  <circle
                    cx={(index / (countryData.length - 1)) * 800}
                    cy={200 - (point.uae / maxValue) * 160 - 25}
                    r="12"
                    fill="#1f2937"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={(index / (countryData.length - 1)) * 800}
                    y={205 - (point.uae / maxValue) * 160 - 25}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-white"
                  >
                    {point.uae}
                  </text>
                </>
              )}
            </g>
          ))}
          
          {/* USA Data points */}
          {countryData.map((point, index) => (
            <g key={`usa-${index}`}>
              <circle
                cx={(index / (countryData.length - 1)) * 800}
                cy={200 - (point.usa / maxValue) * 160}
                r="4"
                fill="#8B5CF6"
                stroke="white"
                strokeWidth="2"
                className="hover:r-6 transition-all cursor-pointer"
                onMouseEnter={() => setHoveredPoint({ month: point.month, value: point.usa, country: 'USA' })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              
              {/* Tooltip circle */}
              {hoveredPoint?.month === point.month && hoveredPoint?.country === 'USA' && (
                <>
                  <circle
                    cx={(index / (countryData.length - 1)) * 800}
                    cy={200 - (point.usa / maxValue) * 160 - 25}
                    r="12"
                    fill="#1f2937"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={(index / (countryData.length - 1)) * 800}
                    y={205 - (point.usa / maxValue) * 160 - 25}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-white"
                  >
                    {point.usa}
                  </text>
                </>
              )}
            </g>
          ))}
          
          {/* Y-axis labels */}
          {[500, 400, 300, 200, 100, 0].map((value) => (
            <text
              key={value}
              x={-10}
              y={205 - (value / maxValue) * 160}
              textAnchor="end"
              className="text-xs fill-gray-500"
            >
              {value}
            </text>
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-2 overflow-x-auto">
          {countryData.map((point) => (
            <span key={point.month} className="text-xs text-gray-500 flex-shrink-0">
              {point.month}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-4 sm:space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
          <span className="text-sm text-gray-600">UAE</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-violet-400 rounded-full"></div>
          <span className="text-sm text-gray-600">USA</span>
        </div>
      </div>
    </div>
  );
};

export default CountryTipsChart;