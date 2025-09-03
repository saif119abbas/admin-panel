import DailyActiveUsersChart from './DailyActiveUsersChart';
import MonthlyActiveUsersChart from './MonthlyActiveUsersChart';
import LoginFrequencyChart from './LoginFrequencyChart';
import TotalTicketsChart from './TotalTicketsChart';

const EngagementMetrics= () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">Engagement and Retention Metrics</h2>
      
      <div className="space-y-6">
        {/* Top row - DAU and MAU */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <DailyActiveUsersChart />
          <MonthlyActiveUsersChart />
        </div>
        
        {/* Bottom row - Login Frequency and Total Tickets */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <LoginFrequencyChart />
          <TotalTicketsChart />
        </div>
      </div>
    </div>
  );
};

export default EngagementMetrics;