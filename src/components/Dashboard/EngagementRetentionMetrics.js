import { useState } from 'react';

// Component 1: Active Users Metrics
const ActiveUsersMetrics = () => {
  const [dauTimeframe, setDauTimeframe] = useState('Monthly');
  const [mauTimeframe, setMauTimeframe] = useState('Monthly');
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

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Active Users (DAU) Percentage</h3>
      <div className="flex space-x-2 mb-6">
        {['Weekly', 'Monthly', 'Yearly'].map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => setDauTimeframe(timeframe)}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              dauTimeframe === timeframe
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {timeframe}
          </button>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Active Users (MAU) Percentage</h3>
      <div className="flex space-x-2">
        {['Weekly', 'Monthly', 'Yearly'].map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => setMauTimeframe(timeframe)}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              mauTimeframe === timeframe
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {timeframe}
          </button>
        ))}
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
    </div>
  );
};

// Component 2: Login Frequency by Month
const LoginFrequencyMonth = () => {
  const [selectedMonth, setSelectedMonth] = useState('JAN');

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Frequency</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-2 py-2 text-sm rounded-lg transition-colors ${
              selectedMonth === month
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};

// Component 3: Login Frequency by Timeframe
const LoginFrequencyTimeframe = () => {
  const [timeframe, setTimeframe] = useState('Monthly');

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Frequency</h3>
      <div className="flex space-x-2">
        {['Weekly', 'Monthly', 'Yearly'].map((time) => (
          <button
            key={time}
            onClick={() => setTimeframe(time)}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              timeframe === time
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

// Component 4: Tickets Metrics
const TicketsMetrics = () => {
  const ticketData = [
    { category: 'Payment', count: 231, percentage: 20 },
    { category: 'Bank Account', count: 231, percentage: 30 },
    { category: 'My Account', count: 231, percentage: 10 },
    { category: 'QR Code', count: 231, percentage: 40 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Tickets Issued</h3>
      <div className="space-y-4">
        {ticketData.map((ticket, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-700">{ticket.category}</span>
              <span className="text-sm text-gray-500">{ticket.count} ({ticket.percentage}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${ticket.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Notional</h3>
        <p className="text-sm text-gray-600">No. of Tickets Issued</p>
      </div>
    </div>
  );
};

// Main component that brings everything together
const EngagementRetentionMetrics = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Engagement and Retention Metrics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveUsersMetrics />
        <LoginFrequencyMonth />
        <LoginFrequencyTimeframe />
        <TicketsMetrics />
      </div>
    </div>
  );
};

export default EngagementRetentionMetrics;