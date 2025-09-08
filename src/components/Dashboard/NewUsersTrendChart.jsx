import { useState, useEffect } from 'react';
import DashboardService from '../../services/dashboardService';

const NewUsersTrendChart = () => {
  const [selectedCountry, setSelectedCountry] = useState('United Arab Emirates');
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [hoveredBar, setHoveredBar] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUserTrendData = async () => {
      setLoading(true);
      try {
        const data = await DashboardService.getUsersTrend();
        setUserData(data);
      } catch (error) {
        console.error('Error loading user trend data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserTrendData();
  }, []);

  // Helper function to parse dates in MM/dd/YYYY format
  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date
  };

  // Get filtered data based on selected country and time filter
  const getFilteredData = () => {
    if (!userData.length) return [];

    const now = new Date();
    const filteredData = [];
    const countryCodeMap = {
      'United Arab Emirates': 'UAE',
      'United States': 'USA',
      'United Kingdom': 'UK',
      'Canada': 'Canada'
    };
    const countryCode = countryCodeMap[selectedCountry];

    // Filter data by selected country
    const countryData = userData.filter(item => 
      item.city1.country === countryCode || item.city2.country === countryCode
    );

    if (!countryData.length) return [];

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
          
          const dayData = countryData.find(item => {
            const itemDate = parseDate(item.date);
            return itemDate.toDateString() === date.toDateString();
          });

          if (dayData) {
            filteredData.push({
              label: dateStr,
              city1: dayData.city1,
              city2: dayData.city2,
              date: dayData.date
            });
          } else {
            // Add empty data for missing days
            filteredData.push({
              label: dateStr,
              city1: { country: countryCode, name: getDefaultCity1(countryCode), value: 0 },
              city2: { country: countryCode, name: getDefaultCity2(countryCode), value: 0 },
              date: date.toLocaleDateString('en-US')
            });
          }
        }
        break;

      case 'Weekly':
        // Last 12 weeks
        for (let i = 11; i >= 0; i--) {
          const weekStart = new Date();
          weekStart.setDate(now.getDate() - (i * 7));
          const weekLabel = `W${Math.ceil((weekStart.getDate() + 6) / 7)}`;
          
          const weekData = countryData.filter(item => {
            const itemDate = parseDate(item.date);
            const weekDiff = Math.floor((now - itemDate) / (7 * 24 * 60 * 60 * 1000));
            return weekDiff === i;
          });

          if (weekData.length > 0) {
            // Use the most recent data point for the week
            const latestData = weekData[weekData.length - 1];
            filteredData.push({
              label: weekLabel,
              city1: latestData.city1,
              city2: latestData.city2,
              date: latestData.date
            });
          } else {
            // Add empty data for missing weeks
            filteredData.push({
              label: weekLabel,
              city1: { country: countryCode, name: getDefaultCity1(countryCode), value: 0 },
              city2: { country: countryCode, name: getDefaultCity2(countryCode), value: 0 },
              date: weekStart.toLocaleDateString('en-US')
            });
          }
        }
        break;

      case 'Monthly':
        // Last 12 months (current year)
        const currentYear = now.getFullYear();
        for (let i = 0; i < 12; i++) {
          const month = new Date(currentYear, i, 1);
          const monthLabel = month.toLocaleDateString('en-US', { 
            month: 'short' 
          }).toUpperCase();
          
          const monthData = countryData.find(item => {
            const itemDate = parseDate(item.date);
            return itemDate.getMonth() === i && 
                   itemDate.getFullYear() === currentYear;
          });

          if (monthData) {
            filteredData.push({
              label: monthLabel,
              city1: monthData.city1,
              city2: monthData.city2,
              date: monthData.date
            });
          } else {
            // Add empty data for missing months
            filteredData.push({
              label: monthLabel,
              city1: { country: countryCode, name: getDefaultCity1(countryCode), value: 0 },
              city2: { country: countryCode, name: getDefaultCity2(countryCode), value: 0 },
              date: month.toLocaleDateString('en-US')
            });
          }
        }
        break;

      case 'Yearly':
        // Last 12 years
         const currentYearNum = now.getFullYear();
  for (let i = 11; i >= 0; i--) {
    const year = currentYearNum - i;
    const yearData = countryData.find(item => {
      const itemDate = parseDate(item.date);
      return itemDate.getFullYear() === year;
    });

          if (yearData) {
            filteredData.push({
              label: year.toString(),
              city1: yearData.city1,
              city2: yearData.city2,
              date: yearData.date
            });
          } else {
            // Add empty data for missing years
            filteredData.push({
              label: year.toString(),
              city1: { country: countryCode, name: getDefaultCity1(countryCode), value: 0 },
              city2: { country: countryCode, name: getDefaultCity2(countryCode), value: 0 },
              date: `01/01/${year}`
            });
          }
        }
        break;

      default:
        return countryData.map(item => ({
          label: parseDate(item.date).toLocaleDateString('en-US', { 
            month: 'short' 
          }).toUpperCase(),
          city1: item.city1,
          city2: item.city2,
          date: item.date
        }));
    }

    return filteredData;
  };

  // Helper functions to get default city names for each country
  const getDefaultCity1 = (countryCode) => {
    const cityMap = {
      'UAE': 'Dubai',
      'USA': 'New York',
      'UK': 'London',
      'Canada': 'Toronto'
    };
    return cityMap[countryCode] || 'City 1';
  };

  const getDefaultCity2 = (countryCode) => {
    const cityMap = {
      'UAE': 'Abu Dhabi',
      'USA': 'Los Angeles',
      'UK': 'Manchester',
      'Canada': 'Vancouver'
    };
    return cityMap[countryCode] || 'City 2';
  };

  const filteredData = getFilteredData();
  const maxValue = filteredData.length > 0 
    ? Math.max(...filteredData.flatMap(d => [d.city1.value, d.city2.value]), 1)
    : 1;

  const barWidth = 20;

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center h-96">
        <div className="text-gray-500">Loading user trend data...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 relative">
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
            {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((period) => (
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
            {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((period) => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-64 sm:h-80 relative overflow-x-auto">
        <div className="min-w-[600px] h-full relative">
          {filteredData.length > 0 ? (
            <svg className="w-full h-full" viewBox={`0 0 ${filteredData.length * 55 + 100} 250`}>
              {/* Grid lines */}
              {[0, 10, 20, 30, 40, 50].map((line) => (
                <g key={line}>
                  <line
                    x1="60"
                    y1={230 - (line / 50) * 180}
                    x2={filteredData.length * 55 + 40}
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
              {filteredData.map((data, index) => {
                const x = 80 + index * 55;
                const city1Height = (data.city1.value / maxValue) * 180;
                const city2Height = (data.city2.value / maxValue) * 180;
                
                return (
                  <g key={index}>
                    {/* City 1 Bar */}
                    <rect
                      x={x - barWidth/2}
                      y={230 - city1Height}
                      width={barWidth}
                      height={city1Height}
                      fill="#4F46E5"
                      rx="2"
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                      onMouseEnter={() => setHoveredBar({ 
                        label: data.label, 
                        value: data.city1.value, 
                        city: data.city1.name 
                      })}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                    
                    {/* City 2 Bar */}
                    <rect
                      x={x + barWidth/2 + 2}
                      y={230 - city2Height}
                      width={barWidth}
                      height={city2Height}
                      fill="#A855F7"
                      rx="2"
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                      onMouseEnter={() => setHoveredBar({ 
                        label: data.label, 
                        value: data.city2.value, 
                        city: data.city2.name 
                      })}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                    
                    {/* Tooltip circles for bars */}
                    {hoveredBar?.label === data.label && hoveredBar?.city === data.city1.name && (
                      <>
                        <circle
                          cx={x - barWidth/2 + barWidth/2}
                          cy={230 - city1Height - 20}
                          r="12"
                          fill="#1f2937"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <text
                          x={x - barWidth/2 + barWidth/2}
                          y={235 - city1Height - 20}
                          textAnchor="middle"
                          className="text-xs font-semibold fill-white"
                        >
                          {data.city1.value}
                        </text>
                      </>
                    )}
                    
                    {hoveredBar?.label === data.label && hoveredBar?.city === data.city2.name && (
                      <>
                        <circle
                          cx={x + barWidth/2 + 2 + barWidth/2}
                          cy={230 - city2Height - 20}
                          r="12"
                          fill="#1f2937"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <text
                          x={x + barWidth/2 + 2 + barWidth/2}
                          y={235 - city2Height - 20}
                          textAnchor="middle"
                          className="text-xs font-semibold fill-white"
                        >
                          {data.city2.value}
                        </text>
                      </>
                    )}
                    
                    {/* Label */}
                    <text
                      x={x + barWidth/2}
                      y={245}
                      textAnchor="middle"
                      className="text-xs fill-gray-500"
                    >
                      {data.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">No data available for {selectedCountry}</div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-4 sm:space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
          <span className="text-sm text-gray-600">
            {filteredData.length > 0 ? filteredData[0].city1.name : 'City 1'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-sm text-gray-600">
            {filteredData.length > 0 ? filteredData[0].city2.name : 'City 2'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewUsersTrendChart;