//src/components/settings/AppHeader.jsx
import React from 'react';
import { Menu } from 'lucide-react';
import CircleButton from './CircleButton.jsx';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';
import notificationIcon from '../../assets/icons/trash.svg';
import arrowDownIcon from '../../assets/icons/trash.svg';

const AppHeader = ({ 
  onMenuClick, 
  userName = "Kathryn Murphy", 
  userRole = "Admin", 
  userImage = null 
}) => {
  const handleNotificationClick = () => {
    console.log('Notification clicked');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden lg:block">
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p 
                className="text-sm font-bold text-black"
                style={AppFonts.smBold({ color: AppColors.black })}
              >
                {userName}
              </p>
              <p 
                className="text-xs text-gray-600"
                style={AppFonts.xsRegular({ color: AppColors.text })}
              >
                {userRole}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                {userImage ? (
                  <img 
                    src={userImage} 
                    alt={userName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span 
                    className="text-white font-semibold"
                    style={AppFonts.mdSemiBold({ color: AppColors.white })}
                  >
                    {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                )}
              </div>

              <img 
                src={arrowDownIcon} 
                alt="dropdown" 
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>

          <CircleButton 
            icon={notificationIcon}
            onClick={handleNotificationClick}
            className="relative"
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;