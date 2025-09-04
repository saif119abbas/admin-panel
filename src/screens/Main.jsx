import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from './Dashboard';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import Marketing from './Marketing';

function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
const { currentView } = useSidebar();
  if (!isAuthenticated) return null;

  // Function to render the right component based on currentView
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <div className="text-center text-gray-500">Users Page</div>;
      case 'all-templates':
        return <Marketing />;
      case 'send-notifications':
        return <Marketing />;
      
      default:
        return <div className="text-center text-gray-500">Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 relative">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          {renderContent()}
        </main>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Main;
