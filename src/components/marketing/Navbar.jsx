import { Mail, MessageSquare, Bell } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full bg-gray-100 rounded-full px-1 py-1 flex-shrink-0 mb-2">
      <div className="flex items-center gap-1">
        <button
          onClick={() => setActiveTab("Email")}
          className={`flex items-center justify-center space-x-2 rounded-full px-4 py-2 text-sm font-medium transition-colors min-h-[36px] ${
            activeTab === "Email"
              ? "bg-cyan-500 text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Mail size={16} className="hidden sm:block" />
          <span>Email Templates</span>
        </button>
        
        <button
          onClick={() => setActiveTab("SMS")}
          className={`flex items-center justify-center space-x-2 rounded-full px-4 py-2 text-sm font-medium transition-colors min-h-[36px] ${
            activeTab === "SMS"
              ? "bg-cyan-500 text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <MessageSquare size={16} className="hidden sm:block" />
          <span>SMS Templates</span>
        </button>
        
        <button
          onClick={() => setActiveTab("In-App")}
          className={`flex items-center justify-center space-x-2 rounded-full px-4 py-2 text-sm font-medium transition-colors min-h-[36px] ${
            activeTab === "In-App"
              ? "bg-cyan-500 text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Bell size={16} className="hidden sm:block" />
          <span>In-App Templates</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;