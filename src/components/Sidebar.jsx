import { Users, TrendingUp, Settings, X, ChevronDown, ChevronUp } from 'lucide-react';
import { TbLayoutDashboard } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
import { useState } from 'react';
import logo from '../assets/images/logo.png';
import backgroundImage from '../assets/images/sidebar.svg';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = ({ isOpen, onClose }) => {
  const [isMarketingExpanded, setIsMarketingExpanded] = useState(false);
  const { changeView, currentView } = useSidebar();
  
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
    { id: 'whatsapp', label: 'WhatsApp Business', icon: RiCustomerServiceLine },
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
      fixed lg:static inset-y-0 left-0 z-50 w-80 text-white flex flex-col transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      
      {/* Logo */}
      <div className="p-6">
        <div 
          className="w-full flex items-center justify-center p-6 relative"
          style={{
            background: '#0000001A',
            borderRadius: '16px'
          }}
        >
          <div className="w-16 h-16 flex items-center justify-center">
            <img 
              src={logo} 
              alt="TipMe Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-white/10 transition-colors absolute right-6 top-1/2 transform -translate-y-1/2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isMarketingActive = item.subItems && item.subItems.some(subItem => subItem.id === currentView);
            
            return (
              <li key={item.id}>
                {hasSubItems ? (
                  <>
                    <button
                      onClick={handleMarketingClick}
                      className="w-full flex items-center justify-between px-0 py-3 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent 
                          className="w-5 h-5 flex-shrink-0" 
                          style={{ 
                            color: isMarketingActive ? '#05CBE7' : 'white' 
                          }}
                        />
                        <span 
                          className="font-medium truncate"
                          style={{ 
                            color: isMarketingActive ? '#05CBE7' : 'white' 
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      {isMarketingExpanded ? (
                        <ChevronUp 
                          className="w-4 h-4 flex-shrink-0" 
                          style={{ 
                            color: isMarketingActive ? '#05CBE7' : 'white' 
                          }}
                        />
                      ) : (
                        <ChevronDown 
                          className="w-4 h-4 flex-shrink-0" 
                          style={{ 
                            color: isMarketingActive ? '#05CBE7' : 'white' 
                          }}
                        />
                      )}
                    </button>
                    
                    {/* Sub-items with smooth animation */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isMarketingExpanded ? 'max-h-96' : 'max-h-0'
                    }`}>
                      <ul className="pl-8 pt-2 space-y-1">
                        {item.subItems.map((subItem) => {
                          const isSubItemActive = currentView === subItem.id;
                          
                          return (
                            <li key={subItem.id}>
                              <button
                                onClick={() => handleSubItemClick(subItem.id)}
                                className="w-full flex items-center px-0 py-2 transition-colors duration-200 text-left"
                              >
                                <span 
                                  className="font-medium text-sm whitespace-normal break-words text-left"
                                  style={{ 
                                    color: isSubItemActive ? '#05CBE7' : 'white' 
                                  }}
                                >
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
                    className="w-full flex items-center space-x-3 px-0 py-3 transition-colors duration-200"
                  >
                    <IconComponent 
                      className="w-5 h-5 flex-shrink-0" 
                      style={{ 
                        color: isActive ? '#05CBE7' : 'white' 
                      }}
                    />
                    <span 
                      className="font-medium truncate"
                      style={{ 
                        color: isActive ? '#05CBE7' : 'white' 
                      }}
                    >
                      {item.label}
                    </span>
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