import { Bell, ChevronDown, Menu } from 'lucide-react';
import userImage from '../assets/images/image.png';

const Header = ({ onMenuClick, userName, userRole, userImage }) => {
  const getInitials = (name) => {
    if (!name) return "US";
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

        <div className="flex items-center space-x-3">
          {/* User Name and Role */}
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>

          {/* User Profile Image */}
          <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center overflow-hidden">
            {userImage ? (
              <img 
                src={userImage} 
                alt={userName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-white">
                {getInitials(userName)}
              </span>
            )}
          </div>

          {/* Dropdown Arrow */}
          <ChevronDown className="hidden sm:block w-4 h-4 text-gray-400" />

          {/* Notifications with colored background circle */}
          <button className="hidden sm:flex w-10 h-10 bg-dark rounded-full items-center justify-center text-white hover:bg-blue-800 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;