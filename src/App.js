import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useState } from 'react';
import Dashboard from './components/Dashboard/index';
function App() {
    const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'users' && <div>Users View</div>}
          {currentView === 'support' && <div>Customer Support View</div>}
          {currentView === 'marketing' && <div>Marketing View</div>}
          {currentView === 'settings' && <div>Settings View</div>}
        </main>
      </div>
         {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;