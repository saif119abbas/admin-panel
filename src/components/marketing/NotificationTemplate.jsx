import { useState, useEffect } from 'react';
import { Mail, ChevronDown, ChevronUp } from 'lucide-react';
import Editor from './Editor2';
import Navbar from './Navbar';
import LeftSidebar from './LeftSidebar';
import MarketingServices from '../../services/marketingServices';
import UsersList from './UsersList';
import ScheduleModal from './ScheduleModal ';
import FilterModal from './FilterModal';
import logoImage from '../../assets/images/TipMe.png';

const mockUsers = [
  {
    id: 1,
    name: "Leatrice Handler",
    email: "tramhuy.rurte@gmail.com",
    phone: "+1 613 555 0143",
    phone2: "+1 202 555 0125",
    country: "Poland",
    city: "Aurora (IL)",
    nationality: "Polish",
    gender: "Female"
  },
  {
    id: 2,
    name: "Johnsie Jock",
    email: "manhhochkt08@gmail.com",
    phone: "+65 1552 4968",
    country: "South Africa",
    city: "Naïcink",
    nationality: "South African",
    gender: "Male"
  },
  {
    id: 3,
    name: "Hannah Burress",
    email: "trungklenspktnd@gmail.com",
    phone: "+1 613 555 0188",
    country: "Palestine, State of",
    city: "Cologne",
    nationality: "Palestinian",
    gender: "Female"
  },
  {
    id: 4,
    name: "Rachel Foose",
    email: "binhan628@gmail.com",
    phone: "+65 9860 0772",
    country: "Guinea",
    city: "Volzhsky",
    nationality: "Guinean",
    gender: "Female"
  },
  {
    id: 5,
    name: "Tyra Dhillon",
    email: "thuhang.rurte@gmail.com",
    phone: "+1 202 555 0107",
    country: "Réunion",
    city: "La Plata",
    nationality: "French", 
    gender: "Female"
  },
  {
    id: 6,
    name: "Murri Santier",
    email: "danahoona87hi@amail.com",
    phone: "+1 ATS RSS 0175",
    country: "Israel",
    city: "North Lac Vapore (NV)",
    nationality: "Israeli",
    gender: "Male"
  }
];

  const filterConfig = [
    {
      key: 'country',
      label: 'Country',
      type: 'dropdown',
      placeholder: 'Select Country',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
        // Add more countries as needed
      ]
    },
    {
      key: 'city',
      label: 'City',
      type: 'dropdown',
      placeholder: 'Select City',
      options: [
        { value: 'new_york', label: 'New York' },
        { value: 'london', label: 'London' },
        { value: 'toronto', label: 'Toronto' },
        // Add more cities as needed
      ]
    },
    {
      key: 'nationality',
      label: 'Nationality',
      type: 'dropdown',
      placeholder: 'Select Nationality',
      options: [
        { value: 'american', label: 'American' },
        { value: 'british', label: 'British' },
        { value: 'canadian', label: 'Canadian' },
        // Add more nationalities as needed
      ]
    },
    {
      key: 'gender',
      label: 'Gender',
      type: 'dropdown',
      placeholder: 'Select Gender',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ]
    }
  ];

const NotificationTemplate = () => {
  const [activeTab, setActiveTab] = useState('Email');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isUserListExpanded, setIsUserListExpanded] = useState(true);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    nationallity: "",
    gender: "",
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
  }, [filters]);
  const onOpen = () => {
    setIsFilterOpen(true)
  }
  const onClose = () => {
    setIsFilterOpen(false)
  }

 const handleApplyFilters = (appliedFilters) => {
    console.log("Applied Filters:", appliedFilters);
    setFilters(appliedFilters);
    // Here you would typically filter your users based on the applied filters
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
        <div className="h-screen bg-gray-100 flex flex-col">
      <div className="p-4 pb-2">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
        <div className="px-4 pb-4 flex-shrink-0"></div>
         <div className="bg-white shadow-md border-2 border-gray-100 rounded-2xl overflow-hidden">
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
      
            <div className="flex-1 overflow-auto max-h-64">
              <UsersList
                users={users}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                selectedUsers={selectedUserIds}
                onSelectUser={handleSelectUser}
                loading={loading}
                handleSelectAll={handleSelectAll}
                onOpen={onOpen}
                filters={filters}
              />
       
          </div>
        )}
      </div>

      {selectedUserIds.length > 0 && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              {selectedUserIds.length} user{selectedUserIds.length !== 1 ? 's' : ''} selected
            </p>
        </div>
      )}

      {/* Mobile sidebar toggle */}
      <div className="md:hidden px-4 pb-4 flex-shrink-0">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
        >
          {isSidebarOpen ? 'Hide Templates' : 'Show Templates'}
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
          <LeftSidebar
            activeTab={activeTab}
            selectedTemplate={selectedTemplate}
            handleTemplateSelect={handleTemplateSelect}
            handelAddTemplate={handleTemplateSelect}
          />
        </div>

        {/* Main Content */}
       <div className="flex-1 flex flex-col bg-white overflow-hidden">
          <div className="flex-1 p-4 overflow-auto">
              {/* Logo Container */}
              <div className="flex items-center justify-center py-4 mb-4">
                <img 
                  src={logoImage} 
                  alt="TipMe Logo" 
                  className="h-16 w-auto" 
                />
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
         {/* Filter Modal */}
      {isFilterOpen && (
        <FilterModal 
          isOpen={isFilterOpen}
          currentFilters={filters}
          onClose={onClose}
          onApplyFilters={handleApplyFilters}
          filterConfig={filterConfig} // Pass the filter configuration
        />
      )}
    </div>
  );
};

export default NotificationTemplate;