import { FileText, Users, DollarSign, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const StatCard = ({ title, value, icon, bgColor, iconBg }) => (
  <div className={`${bgColor} rounded-xl p-6 relative overflow-hidden`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`${iconBg} w-12 h-12 rounded-full flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

const StatsOverview = () => {
  const [activeFilter, setActiveFilter] = useState('Monthly');
  
  const initialStats = [
    {
      title: 'Total No. of Tips',
      value: 10,
      icon: <FileText className="w-6 h-6 text-white" />,
      bgColor: 'bg-purple-50',
      iconBg: 'bg-indigo-600'
    },
    {
      title: 'Total No. of Users',
      value: 8,
      icon: <Users className="w-6 h-6 text-white" />,
      bgColor: 'bg-cyan-50',
      iconBg: 'bg-cyan-500'
    },
    {
      title: 'Total Tip Amounts',
      value: 1,
      icon: <DollarSign className="w-6 h-6 text-white" />,
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-500'
    },
    {
      title: 'Avg. Tip Value',
      value: 5,
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-500'
    }
  ];
  
  const [stats] = useState(initialStats);
  
  const filters = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header section with title and filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">All Stats</h1>
        
       <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-900 rounded-md transition-colors ${
                activeFilter === filter 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      {/* Stats cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
            iconBg={stat.iconBg}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;