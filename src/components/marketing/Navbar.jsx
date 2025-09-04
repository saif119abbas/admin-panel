import { Mail, MessageSquare, Bell } from 'lucide-react';
const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full bg-gray rounded-full  px-6 py-4">
      <div className="flex items-center  w-full  rounded-full px-6  py-4 bg-gray justify-between">
        <div className="bg-gray-100 p-1  w-full  rounded-full px-6 py-3 bg-gray ">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("email")}
              className={`flex items-center space-x-2 rounded-full px-4 py-3 h-full text-xs font-medium transition-colors ${
                activeTab === "email"
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
              }`}
            >
              <Mail size={14} />
              <span>Email</span>
            </button>

            <button
              onClick={() => setActiveTab("sms")}
              className={`flex items-center space-x-2 rounded-full px-4 py-3 h-full text-xs font-medium  transition-colors ${
                activeTab === "sms"
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
              }`}
            >
              <MessageSquare size={14} />
              <span>SMS</span>
            </button>

            <button
              onClick={() => setActiveTab("inapp")}
              className={`flex items-center space-x-2 rounded-full px-4 py-3 h-full text-xs font-medium transition-colors ${
                activeTab === "inapp"
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
              }`}
            >
              <Bell size={14} />
              <span>In-App</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;