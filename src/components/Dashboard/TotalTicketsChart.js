

const TotalTicketsChart= () => {
  const ticketData = [
    { type: 'Payment', count: 231, percentage: 20, color: '#1f2937' },
    { type: 'Bank Account', count: 231, percentage: 30, color: '#06B6D4' },
    { type: 'My Account', count: 231, percentage: 10, color: '#22D3EE' },
    { type: 'QR Code', count: 231, percentage: 40, color: '#E5E7EB' }
  ];

  const totalTickets = 654;
  

  let cumulativePercentage = 0;
  const segments = ticketData.map(item => {
    const startAngle = (cumulativePercentage / 100) * 360;
    cumulativePercentage += item.percentage;
    const endAngle = (cumulativePercentage / 100) * 360;
    return { ...item, startAngle, endAngle };
  });

  const createPath = (centerX, centerY, radius, startAngle, endAngle) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", centerX, centerY,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">Total Tickets Issued</h3>
      
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
        {/* Donut Chart */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Outer ring segments */}
            {segments.map((segment, index) => (
              <path
                key={index}
                d={createPath(100, 100, 80, segment.startAngle, segment.endAngle)}
                fill={segment.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
            
            {/* Inner circle */}
            <circle
              cx="100"
              cy="100"
              r="50"
              fill="white"
            />
            
            {/* Center text */}
            <text
              x="100"
              y="95"
              textAnchor="middle"
              className="text-2xl font-bold fill-gray-900"
            >
              {totalTickets}
            </text>
            <text
              x="100"
              y="110"
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              No. of Tickets Issued
            </text>
          </svg>
        </div>
        
        {/* Legend */}
        <div className="space-y-3 lg:ml-8">
          {ticketData.map((item, index) => (
            <div key={index} className="flex items-center justify-between min-w-[200px]">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.type}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{item.count} ({item.percentage}%)</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalTicketsChart;