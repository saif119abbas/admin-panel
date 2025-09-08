import { useState, useEffect } from 'react';
import DashboardService from '../../services/dashboardService';

const ChurnRateChart = () => {
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [churnData, setChurnData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    value: 0,
    label: ''
  });

  useEffect(() => {
    const loadChurnData = async () => {
      setLoading(true);
      try {
        const data = await DashboardService.getChurnRate();
        setChurnData(data);
      } catch (error) {
        console.error('Error loading churn rate data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChurnData();
  }, []);

  // Filter and format data based on selected time filter
  const getFilteredData = () => {
    if (!churnData.length) return [];

    const now = new Date();
    const filteredData = [];

    switch (timeFilter) {
      case 'Daily':
        // Last 12 days
        for (let i = 11; i >= 0; i--) {
          const date = new Date();
          date.setDate(now.getDate() - i);
          const dateStr = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });
          
          const dayData = churnData.find(item => {
            const itemDate = new Date(item.date);
            return itemDate.toDateString() === date.toDateString();
          });

          filteredData.push({
            label: dateStr,
            value: dayData ? dayData.value : 0,
            rawDate: date
          });
        }
        break;

      case 'Weekly':
        // Last 12 weeks
        for (let i = 11; i >= 0; i--) {
          const weekStart = new Date();
          weekStart.setDate(now.getDate() - (i * 7));
          const weekLabel = `W${Math.ceil((weekStart.getDate() + 6) / 7)}`;
          
          const weekData = churnData.filter(item => {
            const itemDate = new Date(item.date);
            const weekDiff = Math.floor((now - itemDate) / (7 * 24 * 60 * 60 * 1000));
            return weekDiff === i;
          });

          const avgValue = weekData.length > 0 
            ? weekData.reduce((sum, item) => sum + item.value, 0) / weekData.length
            : 0;

          filteredData.push({
            label: weekLabel,
            value: parseFloat(avgValue.toFixed(1)),
            rawDate: weekStart
          });
        }
        break;

      case 'Monthly':
        // Last 12 months (all months of the current year)
        const currentYear = now.getFullYear();
        for (let i = 0; i < 12; i++) {
          const month = new Date(currentYear, i, 1);
          const monthLabel = month.toLocaleDateString('en-US', { 
            month: 'short' 
          }).toUpperCase();
          
          const monthData = churnData.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getMonth() === i && 
                   itemDate.getFullYear() === currentYear;
          });

          const avgValue = monthData.length > 0 
            ? monthData.reduce((sum, item) => sum + item.value, 0) / monthData.length
            : 0;

          filteredData.push({
            label: monthLabel,
            value: parseFloat(avgValue.toFixed(1)),
            rawDate: month
          });
        }
        break;

      case 'Yearly':
        // Last 12 years
        const currentYearNum = now.getFullYear();
        for (let i = 11; i >= 0; i--) {
          const year = currentYearNum - i;
          const yearData = churnData.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getFullYear() === year;
          });

          const avgValue = yearData.length > 0 
            ? yearData.reduce((sum, item) => sum + item.value, 0) / yearData.length
            : 0;

          filteredData.push({
            label: year.toString(),
            value: parseFloat(avgValue.toFixed(1)),
            rawDate: new Date(year, 0, 1)
          });
        }
        break;

      default:
        return churnData.map(item => ({
          label: new Date(item.date).toLocaleDateString('en-US', { 
            month: 'short' 
          }).toUpperCase(),
          value: item.value,
          rawDate: new Date(item.date)
        }));
    }

    return filteredData;
  };

  const filteredData = getFilteredData();
  const maxValue = filteredData.length > 0 
    ? Math.max(...filteredData.map(d => d.value), 1) 
    : 1;

  const handleMouseEnter = (data, x, y) => {
    setTooltip({
      show: true,
      x: x,
      y: y - 10,
      value: data.value,
      label: data.label
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, value: 0, label: '' });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center h-80">
        <div className="text-gray-500">Loading churn rate data...</div>
      </div>
    );
  }

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
        {filteredData.length > 0 ? (
          <>
            <svg className="w-full h-full" viewBox={`0 0 ${filteredData.length * 80} 200`}>
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
                  x2={filteredData.length * 80}
                  y2={200 - (line * 40)}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
              ))}
              
              {/* Area fill */}
              <path
                d={`M 0 ${200 - (filteredData[0].value / maxValue) * 160} ${filteredData.map((point, index) => 
                  `L ${index * 80} ${200 - (point.value / maxValue) * 160}`
                ).join(' ')} L ${(filteredData.length - 1) * 80} 200 L 0 200 Z`}
                fill="url(#churnGradient)"
              />
              
              {/* Line */}
              <polyline
                points={filteredData.map((point, index) => 
                  `${index * 80},${200 - (point.value / maxValue) * 160}`
                ).join(' ')}
                fill="none"
                stroke="#06B6D4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points */}
              {filteredData.map((point, index) => (
                <circle
                  key={index}
                  cx={index * 80}
                  cy={200 - (point.value / maxValue) * 160}
                  r="5"
                  fill="#06B6D4"
                  stroke="white"
                  strokeWidth="2"
                  className="hover:r-7 transition-all cursor-pointer"
                  onMouseEnter={(e) => {
                    const rect = e.target.getBoundingClientRect();
                    handleMouseEnter(point, index * 80, 200 - (point.value / maxValue) * 160);
                  }}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </svg>
            
            {/* X-axis labels */}
            <div className="flex justify-between mt-2 px-2 overflow-x-auto">
              {filteredData.map((point, index) => (
                <span 
                  key={index} 
                  className="text-xs text-gray-500 flex-shrink-0 text-center"
                  style={{ width: `${80 / filteredData.length}%` }}
                >
                  {point.label}
                </span>
              ))}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-6 sm:-ml-8">
              {[5, 4, 3, 2, 1, 0].map((value) => (
                <span key={value}>{value}</span>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">No data available</div>
          </div>
        )}
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
            left: `${(tooltip.x / ((filteredData.length - 1) * 80 || 1)) * 100}%`,
            top: `${((tooltip.y + 40) / 200) * 100}%`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="bg-black text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
            <div className="text-center">
              <div className="font-semibold">{tooltip.label}</div>
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