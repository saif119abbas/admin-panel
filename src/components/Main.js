import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import StatsOverview from './Dashboard/StatsOverview';
import ChurnRateChart from './Dashboard/ChurnRateChart';
import ActiveUsersChart from './Dashboard/ActiveUsersChart';
import CountryTipsChart from './Dashboard/CountryTipsChart';
import NewUsersTrendChart from './Dashboard/NewUsersTrendChart';
import EngagementRetentionMetrics from './Dashboard/EngagementRetentionMetrics';
import { useAuth } from '../context/AuthContext';

function Main() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return null;
  return (
    <div className="flex h-screen bg-gray-50 relative">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
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
            
            <EngagementRetentionMetrics />
          </div>
        </main>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Main;