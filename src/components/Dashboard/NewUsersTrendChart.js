import { useState } from 'react';
const NewUsersTrendChart = () => {
  const [selectedCountry, setSelectedCountry] = useState('United Arab Emirates');
  const [timeFilter, setTimeFilter] = useState('Monthly');
  
  const userData = [
    { month: 'JAN', dubai: 22, abuDhabi: 38 },
    { month: 'FEB', dubai: 19, abuDhabi: 12 },
    { month: 'MAR', dubai: 10, abuDhabi: 28 },
    { month: 'APR', dubai: 20, abuDhabi: 12 },
    { month: 'MAY', dubai: 18, abuDhabi: 28 },
    { month: 'JUN', dubai: 5, abuDhabi: 10 },
    { month: 'JUL', dubai: 20, abuDhabi: 26 },
    { month: 'AUG', dubai: 20, abuDhabi: 28 },
    { month: 'SEP', dubai: 15, abuDhabi: 32 },
    { month: 'OCT', dubai: 12, abuDhabi: 6 },
    { month: 'NOV', dubai: 15, abuDhabi: 18 },
    { month: 'DEC', dubai: 22, abuDhabi: 8 }
  ];

  const maxValue = Math.max(...userData.flatMap(d => [d.dubai, d.abuDhabi]));
  const barWidth = 20;
  const barSpacing = 45;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">New Users Trend By Country</h3>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Country Selector */}
          <select 
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white min-w-[180px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
          </select>
          
          {/* Time Filter - Desktop */}
          <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
            {['Weekly', 'Monthly', 'Yearly'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeFilter(period)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeFilter === period
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          
          {/* Time Filter - Mobile */}
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="sm:hidden text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {['Weekly', 'Monthly', 'Yearly'].map((period) => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-64 sm:h-80 relative overflow-x-auto">
        <div className="min-w-[600px] h-full relative">
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
            {userData.map((data, index) => {
              const x = 80 + index * 55;
              const dubaiHeight = (data.dubai / maxValue) * 180;
              const abuDhabiHeight = (data.abuDhabi / maxValue) * 180;
              
              return (
                <g key={data.month}>
                  {/* Dubai Bar */}
                  <rect
                    x={x - barWidth/2}
                    y={230 - dubaiHeight}
                    width={barWidth}
                    height={dubaiHeight}
                    fill="#4F46E5"
                    rx="2"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                  
                  {/* Abu Dhabi Bar */}
                  <rect
                    x={x + barWidth/2 + 2}
                    y={230 - abuDhabiHeight}
                    width={barWidth}
                    height={abuDhabiHeight}
                    fill="#A855F7"
                    rx="2"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                  
                  {/* Month Label */}
                  <text
                    x={x + barWidth/2}
                    y={245}
                    textAnchor="middle"
                    className="text-xs fill-gray-500"
                  >
                    {data.month}
                  </text>
                </g>
              );
            })}
            
            {/* Peak indicator for June */}
            <g>
              <circle
                cx={80 + 5 * 55 + barWidth/2 + 2}
                cy={230 - (userData[5].abuDhabi / maxValue) * 180 - 15}
                r="12"
                fill="#1f2937"
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={80 + 5 * 55 + barWidth/2 + 2}
                y={235 - (userData[5].abuDhabi / maxValue) * 180 - 15}
                textAnchor="middle"
                className="text-xs font-semibold fill-white"
              >
                {userData[5].abuDhabi}
              </text>
            </g>
          </svg>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-4 sm:space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
          <span className="text-sm text-gray-600">Dubai</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Abu Dhabi</span>
        </div>
      </div>
    </div>
  );
};

export default NewUsersTrendChart;