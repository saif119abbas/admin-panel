//src/components/Users/UserStats.jsx
import { Users as UsersIcon, UserCheck } from 'lucide-react';
import UserExclamationIcon from "../../assets/icons/UserExclamationIcon";

const UserStats = ({ stats = {} }) => {
  const { total = 0, activeUsers = 0, newUsers = 0 } = stats;

  const statCards = [
    {
      title: 'Total No. of Users',
      value: total.toLocaleString(),
      icon: UsersIcon,
      bgColor: 'bg-secondary',
    },
    {
      title: 'Total No. of Active Users',
      value: activeUsers.toLocaleString(),
      icon: UserCheck,
      bgColor: 'bg-success',
    },
    {
      title: 'Total No. of Pending Users',
      value: newUsers.toLocaleString(),
      icon: UserExclamationIcon,
      bgColor: 'bg-orange_600',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 justify-items-center">
    {statCards.map((card, index) => {
        const IconComponent = card.icon;
        return (
        <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200
                    w-full max-w-[442.5px] h-[100px] 
                    sm:max-w-[300px] sm:h-[90px] 
                    md:max-w-[400px] md:h-[100px] 
                    lg:max-w-[442.5px] lg:h-[100px]"
        >
            <div className="flex items-center justify-between h-full">
            <div>
                <p className="text-h3 font-bold text-gray-900 mb-1">{card.value}</p>
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

export default UserStats;