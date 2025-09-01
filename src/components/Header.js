import { Bell, ChevronDown, Menu } from 'lucide-react';


const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">

          {/* Notifications */}
          <button className="hidden sm:block p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-white">KM</span>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">Kathryn Murphy</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <ChevronDown className="hidden sm:block w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;