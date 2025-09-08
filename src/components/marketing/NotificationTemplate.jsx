import { useState, useEffect } from 'react';
import { Mail, ChevronDown, ChevronUp } from 'lucide-react';
import Editor from './Editor2';
import Navbar from './Navbar';
import LeftSidebar from './LeftSidebar';
import MarketingServices from '../../services/marketingServices';
import UsersList from './UsersList';
import ScheduleModal from './ScheduleModal ';

const NotificationTemplate = () => {
  const [activeTab, setActiveTab] = useState('Email');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isUserListExpanded, setIsUserListExpanded] = useState(true);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  useEffect(() => {
    const loadUserTrendData = async () => {
      setLoading(true);
      try {
        const usersData = await MarketingServices.getUsers()
        setUsers(usersData);
        setTotalPages(1)
      } catch (error) {
        console.error('Error loading user trend data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserTrendData();
  }, []);
  const onOpen = () => {
    setIsFilterOpen(true)
  }
  const onClose = () => {
    setIsFilterOpen(false)
  }

  const handleApplyFilters = (appliedFilters) => {
    console.log("Applied Filters:", appliedFilters);
    setFilters(appliedFilters);
  }
  useEffect(() => {
    const updatedSelectedUsers = users.filter(user => selectedUserIds.includes(user.id));
    setSelectedUsers(updatedSelectedUsers);
  }, [selectedUserIds, users]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setEditorContent(template.content || '');
    setIsSidebarOpen(false);
  };

  const handleSend = async () => {

    const newTemplate = {
      ...selectedTemplate,
      content: editorContent
    };
    const data = {
      template: newTemplate,
      users: selectedUsers
    }
    const res = await MarketingServices.sendNotification(data);
    console.log(res);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSelectUser = (userId, isSelected) => {
    if (isSelected) {
      setSelectedUserIds([...selectedUserIds, userId]);
    } else {
      setSelectedUserIds(selectedUserIds.filter(id => id !== userId));
    }
  };

  const handleSelectAll = () => {
    if (selectedUserIds.length === users.length && users.length > 0) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(users.map(user => user.id));
    }
  };


  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* User Selection Section */}
      <div className="m-4 bg-white shadow-md border-2 border-gray-100 rounded-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            className="w-full flex items-center justify-between text-left"
            onClick={() => setIsUserListExpanded(!isUserListExpanded)}
          >
            <h2 className="text-xl font-bold">Select Who to Notify</h2>
            {isUserListExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {isUserListExpanded && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedUserIds.length === users.length && users.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                />
                <label className="ml-2 text-sm font-medium text-gray-900">Select All</label>
              </div>
            </div>

            <div className="flex-1 overflow-auto max-h-64">
              <UsersList
                users={users}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                selectedUsers={selectedUserIds}
                onSelectUser={handleSelectUser}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>

      {/* Selected users count */}
      {selectedUserIds.length > 0 && (
        <div className="mx-4 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            {selectedUserIds.length} user{selectedUserIds.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      )}

      {/* Mobile sidebar toggle */}
      <div className="md:hidden p-4 border-b border-gray-200 bg-white">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
        >
          {isSidebarOpen ? 'Hide Templates' : 'Show Templates'}
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
          <LeftSidebar
            activeTab={activeTab}
            selectedTemplate={selectedTemplate}
            handleTemplateSelect={handleTemplateSelect}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="flex-1 p-4 overflow-auto">
            <div className="flex items-center justify-center py-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-2 mx-auto flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div className="text-lg font-bold text-gray-900">TipMe</div>
              </div>
            </div>

            {selectedTemplate ? (
              <div className="bg-white rounded-lg shadow-xs h-full flex flex-col">
                {/* Subject Line */}
                {selectedTemplate.type === 'email' && (
                  <div className="p-3">
                    <h4 className="block text-xs font-medium text-gray-700 mb-1">
                      Subject<span className="text-red-500">*</span>
                    </h4>
                    <input
                      type="text"
                      defaultValue={selectedTemplate.subject || ''}
                      placeholder="Enter"
                      className="w-full px-2 py-1.5 border border-gray rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-sm"
                    />
                  </div>
                )}

                <div className='border-2 border-gray-200 rounded-xl flex-1 min-h-[300px]'>
                  <Editor value={editorContent} onChange={setEditorContent} />
                </div>

                {/* Action Buttons */}
                <div className="p-3">
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <button
                      onClick={handleSend}
                      className="px-4 py-1.5 w-full md:w-[120px] h-[40px] bg-white text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors font-medium text-sm"
                    >
                      Send Now
                    </button>
                    <button
                      onClick={() => setIsScheduleModalOpen(true)}
                      className="px-4 py-1.5 w-full md:w-[120px] h-[40px] bg-white text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors font-medium text-sm"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-xs border border-gray-200 h-full flex items-center justify-center p-4">
                <div className="text-center">
                  <Mail size={32} className="text-gray-300 mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">No Template Selected</h3>
                  <p className="text-xs text-gray-500">Choose a template from the sidebar to get started</p>
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium md:hidden"
                  >
                    Show Templates
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        template={selectedTemplate}
        content={editorContent}
        users={selectedUsers}
      />
    </div>
  );
};

export default NotificationTemplate;