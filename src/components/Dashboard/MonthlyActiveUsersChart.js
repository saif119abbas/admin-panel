import  { useState } from 'react';

const MonthlyActiveUsersChart = () => {
  const [timeFilter, setTimeFilter] = useState('Monthly');
  
  const mauData = [
    { month: 'JAN', value: 10 },
    { month: 'FEB', value: 8 },
    { month: 'MAR', value: 3 },
    { month: 'APR', value: 12 },
    { month: 'MAY', value: 10 },
    { month: 'JUN', value: 2 },
    { month: 'JUL', value: -5 },
    { month: 'AUG', value: 8 },
    { month: 'SEP', value: 8 },
    { month: 'OCT', value: -8 },
    { month: 'NOV', value: -5 },
    { month: 'DEC', value: 2 }
  ];

  //const maxValue = Math.max(...mauData.map(d => Math.abs(d.value)));
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Monthly Active Users (MAU) Percentage</h3>
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

      <div className="h-48 sm:h-64 relative overflow-x-auto">
        <div className="min-w-[600px] h-full relative">
          <svg className="w-full h-full" viewBox="0 0 800 200">
            <defs>
              <linearGradient id="mauGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[-10, -5, 0, 5, 10, 15].map((line) => (
              <line
                key={line}
                x1="0"
                y1={100 - (line / 15) * 80}
                x2="800"
                y2={100 - (line / 15) * 80}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            ))}
            
            {/* Zero line */}
            <line
              x1="0"
              y1="100"
              x2="800"
              y2="100"
              stroke="#d1d5db"
              strokeWidth="2"
            />
            
            {/* Area fill */}
            <path
              d={`M 0 ${100 - (mauData[0].value / 15) * 80} ${mauData.map((point, index) => 
                `L ${(index / (mauData.length - 1)) * 800} ${100 - (point.value / 15) * 80}`
              ).join(' ')} L 800 100 L 0 100 Z`}
              fill="url(#mauGradient)"
            />
            
            {/* Line */}
            <polyline
              points={mauData.map((point, index) => 
                `${(index / (mauData.length - 1)) * 800},${100 - (point.value / 15) * 80}`
              ).join(' ')}
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {mauData.map((point, index) => (
              <circle
                key={index}
                cx={(index / (mauData.length - 1)) * 800}
                cy={100 - (point.value / 15) * 80}
                r="4"
                fill="#8B5CF6"
                stroke="white"
                strokeWidth="2"
                className="hover:r-6 transition-all cursor-pointer"
              />
            ))}
          </svg>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2 px-2">
            {mauData.map((point) => (
              <span key={point.month} className="text-xs text-gray-500 flex-shrink-0">
                {point.month}
              </span>
            ))}
          </div>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
            {[15, 10, 5, 0, -5, -10].map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyActiveUsersChart;