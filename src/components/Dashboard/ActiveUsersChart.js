
const ActiveUsersChart = () => {
  const totalUsers = 654;
  const activeUsers = 231;
  const percentage = Math.round((activeUsers / totalUsers) * 100);
  
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">Active Users vs. Total Users</h3>
      
      <div className="flex items-center justify-center">
        <div className="relative w-36 h-36 sm:w-48 sm:h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="6"
            />
            
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="6"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalUsers}</p>
            <p className="text-xs sm:text-sm text-gray-500 text-center px-2">Total No. of Users</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
          <span className="text-sm text-gray-600">
            Total No. of Active Users
          </span>
        </div>
      </div>
      
      <div className="text-center mt-2">
        <span className="text-base sm:text-lg font-semibold text-gray-900">
          {activeUsers} ({percentage}%)
        </span>
      </div>
    </div>
  );
};

export default ActiveUsersChart;