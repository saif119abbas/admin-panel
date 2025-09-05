import { Users, TrendingUp, Settings, X, ChevronDown, ChevronUp } from 'lucide-react';
import { TbLayoutDashboard } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
import { useState } from 'react';
import logo from '../assets/images/logo.png';
import background from '../assets/images/background.svg';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = ({  isOpen, onClose }) => {
  const [isMarketingExpanded, setIsMarketingExpanded] = useState(false);
  const { changeView,currentView } = useSidebar();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TbLayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'support', label: 'Customer Support', icon: RiCustomerServiceLine },
    { 
      id: 'marketing', 
      label: 'Marketing', 
      icon: TrendingUp,
      subItems: [
        { id: 'all-templates', label: 'All Templates' },
        { id: 'create-templates', label: 'Create Custom Templates' },
        { id: 'send-notifications', label: 'Send Notifications' }
      ]
    },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleItemClick = (itemId) => {
    changeView(itemId);
    onClose(); // Close sidebar on mobile after selection
  };

  const handleMarketingClick = () => {
    setIsMarketingExpanded(!isMarketingExpanded);
  };

  const handleSubItemClick = (itemId) => {
    changeView(itemId);
    onClose(); // Close sidebar on mobile after selection
  };

  return (
    <div className={`
      fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white flex flex-col transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Logo */}
      <div className="p-6 bg-secondary relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5">
              <img 
                src={logo} 
                alt="TipMe Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-indigo-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 relative z-10 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            
            return (
              <li key={item.id}>
                {hasSubItems ? (
                  <>
                    <button
                      onClick={handleMarketingClick}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive || (item.subItems.some(subItem => subItem.id === currentView))
                          ? 'text-primary'
                          : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium truncate">{item.label}</span>
                      </div>
                      {isMarketingExpanded ? (
                        <ChevronUp className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                      )}
                    </button>
                    
                    {/* Sub-items with smooth animation */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isMarketingExpanded ? 'max-h-96' : 'max-h-0'
                    }`}>
                      <ul className="pl-4 pt-2 space-y-2">
                        {item.subItems.map((subItem) => {
                          const isSubItemActive = currentView === subItem.id;
                          
                          return (
                            <li key={subItem.id}>
                              <button
                                onClick={() => handleSubItemClick(subItem.id)}
                                className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-left ${
                                  isSubItemActive
                                    ? 'text-primary'
                                    : 'text-indigo-100 hover:bg-indigo-400 hover:text-white'
                                }`}
                              >
                                <span className="font-medium text-sm whitespace-normal break-words text-left">
                                  {subItem.label}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-primary'
                        : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;