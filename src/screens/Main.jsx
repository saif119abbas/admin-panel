import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from './Dashboard';
import Settings from './Settings';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import Marketing from './Marketing';
import { MarketingProvider } from '../context/MarketingContext';

function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
const { currentView } = useSidebar();
  if (!isAuthenticated) return null;

  

  return (
    <div className="flex h-screen bg-gray-50 bg-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          {currentView==="dashboard" && <Dashboard />}
          {currentView==="settings" && <Settings />}
          {currentView==="users " && <div className="text-center text-gray-500">Users Page</div>}
          {
          (currentView==="create-templates"  || currentView==="all-templates" || currentView==="send-notifications")
          && 
          <MarketingProvider>
            <Marketing />
          </MarketingProvider>
          }
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
