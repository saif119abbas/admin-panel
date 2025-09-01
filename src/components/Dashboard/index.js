import StatsOverview from "./StatsOverview"
import ChurnRateChart from "./ChurnRateChart"
import ActiveUsersChart from "./ActiveUsersChart"
import CountryTipsChart from "./CountryTipsChart"
import NewUsersTrendChart from "./NewUsersTrendChart"
import EngagementRetentionMetrics from "./EngagementRetentionMetrics"

 const Dashboard = () => {   
    return (
                <div className="space-y-6">
            <StatsOverview />
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">Overview of Key Metrics</h2>
              
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
      
    )
}
export default  Dashboard