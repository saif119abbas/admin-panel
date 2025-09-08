// src/screens/Main.jsx
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Users from './Users';
import CustomerSupport from './CustomerSupport';
import { useAuth } from '../context/AuthContext'; 
import { useSidebar } from '../context/SidebarContext';
import { usePermissions } from '../hooks/usePermissions';
import Marketing from './Marketing';
import { MarketingProvider } from '../context/MarketingContext';
import userImage from '../assets/images/image.png';
import { UserProvider } from '../context/UserContext';
import { SettingsProvider } from '../context/SettingsContext';

function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth(); 
  const { currentView, changeView } = useSidebar();
  const { hasPermission, permittedPages } = usePermissions();
  
  // get from auth context
  const userData = {
    name: user?.name || "Admin User",
    role: user?.roleName || "Admin",
    image: user?.image || userImage
  };

  // Redirect to first permitted page if current view is not permitted
  useEffect(() => {
    if (permittedPages.length > 0 && !hasPermission(currentView)) {
      changeView(permittedPages[0]);
    }
  }, [permittedPages, currentView, hasPermission, changeView]);

  if (!isAuthenticated) return null;

  const renderContent = () => {
    // Always ensure user is on a permitted page before rendering
    if (!hasPermission(currentView) && permittedPages.length > 0) {
      // Don't render anything while redirecting
      return null;
    }

    if (currentView === "dashboard" && hasPermission("dashboard")) {
      return <Dashboard />;
    }
    
    if (currentView === "settings" && hasPermission("settings")) {
      return (
        <SettingsProvider>
          <Settings />
        </SettingsProvider>
      );
    }
    
    if (currentView === "users" && hasPermission("users")) {
      return (
        <UserProvider>
          <Users />
        </UserProvider>
      );
    }
    
    if (currentView === "support" && hasPermission("support")) {
      return <CustomerSupport />;
    }
    
    if ((currentView === "create-templates" || currentView === "all-templates" || currentView === "send-notifications") && 
        (hasPermission("all-templates") || hasPermission("create-templates") || hasPermission("send-notifications"))) {
      return (
        <MarketingProvider>
          <Marketing />
        </MarketingProvider>
      );
    }

    // If no valid page found and we have permitted pages, redirect will handle it
    return null;
  };

  return (
    <div className="flex h-screen bg-gray-50 bg-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          userName={userData.name}
          userRole={userData.role}
          userImage={userData.image}
          onLogout={logout}
        />
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