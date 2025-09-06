// src/components/CustomerSupport/SupportStats.jsx
import { Ticket, LoaderCircle, CircleCheck, CircleAlert } from 'lucide-react';

const SupportStats = ({ stats, loading = false }) => {
  // Define stat cards configuration
  const statCards = [
    {
      title: 'Total No. of Tickets',
      value: stats.total.toLocaleString(),
      icon: Ticket,
      bgColor: 'bg-secondary',
      color: 'text-secondary',
      highlight: false
    },
    {
      title: 'Total No. of Pending Tickets',
      value: stats.pending.toLocaleString(),
      icon: CircleAlert,
      bgColor: 'bg-orange_600',
      color: 'text-orange_600',
      highlight: false
    },
    {
      title: 'Total No. of In-progress Tickets',
      value: stats.inProgress.toLocaleString(),
      icon: LoaderCircle,
      bgColor: 'bg-primary',
      color: 'text-primary',
      highlight: false
    },
    {
      title: 'Total No. of Resolved Tickets',
      value: stats.resolved.toLocaleString(),
      icon: CircleCheck,
      bgColor: 'bg-success',
      color: 'text-success',
      highlight: true // <-- only the last card gets the highlight
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 justify-items-center">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200
                       w-full max-w-[328px] h-[100px]
                       animate-pulse"
          >
            <div className="flex items-center justify-between h-full">
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    // Responsive grid
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 justify-items-center">
      {statCards.map((card, index) => {
        const IconComponent = card.icon;
        return (
            <div
            key={index}
            className={`
                rounded-lg p-4 shadow-sm 
                w-full max-w-[328px] h-[100px]
                hover:shadow-md transition-shadow duration-200
                ${card.highlight 
                ? 'bg-success_50 border border-success'   // خلفية + بوردر أخضر
                : 'bg-white border border-gray-200'}      // باقي البطاقات بوردَر رمادي
            `}
            >
            <div className="flex items-center justify-between h-full">
                <div>
                <p className={`text-h3 font-bold mb-1 ${card.highlight ? 'text-success' : 'text-gray-900'}`}>
                    {card.value}
                </p>
                <p className="text-sm text-gray-600">{card.title}</p>
                </div>
                <div className={`w-12 h-12 ${card.bgColor} rounded-full flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
                </div>
            </div>
            </div>

        );
      })}
    </div>
  );
};

export default SupportStats;
