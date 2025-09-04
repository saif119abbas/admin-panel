import StatsOverview from "../components/Dashboard/StatsOverview";
import ChurnRateChart from "../components/Dashboard/ChurnRateChart";
import ActiveUsersChart from "../components/Dashboard/ActiveUsersChart";
import CountryTipsChart from "../components/Dashboard/CountryTipsChart";
import NewUsersTrendChart from "../components/Dashboard/NewUsersTrendChart";
import EngagementRetentionMetrics from "../components/Dashboard/EngagementRetentionMetrics";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <StatsOverview />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">
          Overview of Key Metrics
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ChurnRateChart />
          <ActiveUsersChart />
        </div>

        <div className="mt-6">
          <CountryTipsChart />
        </div>
        <div className="mt-6">
          <NewUsersTrendChart />
        </div>
      </div>
      <div className="mt-6">
        <EngagementRetentionMetrics />
      </div>
    </div>
  );
};
export default Dashboard;
