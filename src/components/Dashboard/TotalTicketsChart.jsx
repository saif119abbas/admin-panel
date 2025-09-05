import  { useState } from 'react';

const TotalTicketsChart = () => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  
  const ticketData = [
    { type: 'Payment', count: 231, percentage: 20, color: '#1f2937' },
    { type: 'Bank Account', count: 231, percentage: 30, color: '#06B6D4' },
    { type: 'My Account', count: 231, percentage: 10, color: '#22D3EE' },
    { type: 'QR Code', count: 231, percentage: 40, color: '#E5E7EB' }
  ];

  const totalTickets = 654;
  
  // Calculate cumulative percentages for the donut chart
  let cumulativePercentage = 0;
  const segments = ticketData.map(item => {
    const startAngle = (cumulativePercentage / 100) * 360;
    cumulativePercentage += item.percentage;
    const endAngle = (cumulativePercentage / 100) * 360;
    return { ...item, startAngle, endAngle };
  });

  const createPath = (centerX, centerY, outerRadius, innerRadius, startAngle, endAngle, isHovered) => {
    //const adjustedOuterRadius = isHovered ? outerRadius + 5 : outerRadius;
    const start = polarToCartesian(centerX, centerY, outerRadius, endAngle);
    const end = polarToCartesian(centerX, centerY, outerRadius, startAngle);
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
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
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 relative">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">Total Tickets Issued</h3>
      
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
        {/* Donut Chart */}
        <div className="relative w-80 h-80 sm:w-96 sm:h-96">
          <svg className="w-full h-full" viewBox="0 0 240 240">
            {/* Outer ring segments */}
            {segments.map((segment, index) => (
              <path
                key={index}
                d={createPath(120, 120, 100, 65, segment.startAngle, segment.endAngle, hoveredSegment?.type === segment.type)}
                fill={segment.color}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredSegment(segment)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            ))}
            
            {/* Tooltip circle for hovered segment */}
            {hoveredSegment && (
              <>
                <circle
                  cx="120"
                  cy="90"
                  r="15"
                  fill="#1f2937"
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x="120"
                  y="96"
                  textAnchor="middle"
                  className="text-xs font-semibold fill-white"
                >
                  {hoveredSegment.percentage}%
                </text>
              </>
            )}
            
            {/* Center text */}
            <text
              x="120"
              y="115"
              textAnchor="middle"
              className="text-2xl sm:text-3xl font-bold fill-gray-900"
            >
              {totalTickets}
            </text>
            <text
              x="120"
              y="130"
              textAnchor="middle"
              className="text-xs sm:text-sm fill-gray-500"
            >
              No. of Tickets Issued
            </text>
          </svg>
        </div>
        
        {/* Legend */}
        <div className="space-y-4 lg:ml-8">
          {ticketData.map((item, index) => (
            <div key={index} className="flex items-center justify-between min-w-[220px]">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
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