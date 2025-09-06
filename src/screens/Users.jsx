// src/screens/Users.jsx
import { useState, useEffect } from 'react';
import UserTable from '../components/Users/UserTable';
import UserStats from '../components/Users/UserStats';
import UserFilters from '../components/Users/UserFilters';
import FilterModal from '../components/Users/modals/FilterModal';
import UserProfile from '../components/Users/UserProfile';
import '../App.css';

const Users = () => {
  const mockUsers = [
    {
      id: 1,
      name: 'Darleen Quincel',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      createdOn: '03 August, 2025',
      status: 'Active',
      country: 'Georgia',
      city: 'Atlanta',
      bgColor: 'bg-purple-500'
    },
    {
      id: 2,
      name: 'Barbara Gordon',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Haiti',
      city: 'Port-au-Prince',
      bgColor: 'bg-yellow-500'
    },
    {
      id: 3,
      name: 'Lois Lane',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      createdOn: '03 August, 2025',
      status: 'Active',
      country: 'Palestine, State of',
      city: 'Ramallah',
      bgColor: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Paula Irving',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Central African Republic',
      city: 'Bangui',
      bgColor: 'bg-red-500'
    },
    {
      id: 5,
      name: 'Lois Lane',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Curaçao',
      city: 'Willemstad',
      bgColor: 'bg-gray-500'
    },
    {
      id: 6,
      name: 'Natasha Romanoff',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      createdOn: '03 August, 2025',
      status: 'Active',
      country: 'Saint Vincent and the Grenadines',
      city: 'Kingstown',
      bgColor: 'bg-red-600'
    },
    {
      id: 7,
      name: 'Carol Danvers',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Brazil',
      city: 'São Paulo',
      bgColor: 'bg-blue-500'
    },
    {
      id: 8,
      name: 'Wanda Maximoff',
      createdOn: '03 August, 2025',
      status: 'Active',
      country: 'Guinea',
      city: 'Conakry',
      bgColor: 'bg-pink-500'
    },
    {
      id: 9,
      name: 'Diana Prince',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Poland',
      city: 'Warsaw',
      bgColor: 'bg-indigo-500'
    },
    {
      id: 10,
      name: 'Carol Danvers',
      createdOn: '03 August, 2025',
      status: 'Active',
      country: 'South Africa',
      city: 'Cape Town',
      bgColor: 'bg-teal-500'
    },
    {
      id: 11,
      name: 'Pepper Potts',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Åland Islands',
      city: 'Mariehamn',
      bgColor: 'bg-orange-500'
    },
    {
      id: 12,
      name: 'Karen Starr',
      createdOn: '03 August, 2025',
      status: 'Pending',
      country: 'Bahrain',
      city: 'Manama',
      bgColor: 'bg-cyan-500'
    },
    // Add more mock users to test pagination
    {
      id: 13,
      name: 'John Doe',
      createdOn: '04 August, 2025',
      status: 'Active',
      country: 'USA',
      city: 'New York',
      bgColor: 'bg-blue-600'
    },
    {
      id: 14,
      name: 'Jane Smith',
      createdOn: '04 August, 2025',
      status: 'Pending',
      country: 'Canada',
      city: 'Toronto',
      bgColor: 'bg-red-700'
    },
    {
      id: 15,
      name: 'Robert Johnson',
      createdOn: '05 August, 2025',
      status: 'Active',
      country: 'UK',
      city: 'London',
      bgColor: 'bg-green-600'
    },
    {
      id: 16,
      name: 'Emily Davis',
      createdOn: '05 August, 2025',
      status: 'Pending',
      country: 'Australia',
      city: 'Sydney',
      bgColor: 'bg-purple-600'
    },
    {
      id: 17,
      name: 'Michael Wilson',
      createdOn: '06 August, 2025',
      status: 'Active',
      country: 'Germany',
      city: 'Berlin',
      bgColor: 'bg-yellow-600'
    },
    {
      id: 18,
      name: 'Sarah Brown',
      createdOn: '06 August, 2025',
      status: 'Pending',
      country: 'France',
      city: 'Paris',
      bgColor: 'bg-pink-600'
    },
    {
      id: 19,
      name: 'David Miller',
      createdOn: '07 August, 2025',
      status: 'Active',
      country: 'Japan',
      city: 'Tokyo',
      bgColor: 'bg-indigo-600'
    },
    {
      id: 20,
      name: 'Lisa Taylor',
      createdOn: '07 August, 2025',
      status: 'Pending',
      country: 'South Korea',
      city: 'Seoul',
      bgColor: 'bg-teal-600'
    },
    {
      id: 21,
      name: 'James Anderson',
      createdOn: '08 August, 2025',
      status: 'Active',
      country: 'Brazil',
      city: 'Rio de Janeiro',
      bgColor: 'bg-orange-600'
    },
    {
      id: 22,
      name: 'Jennifer Thomas',
      createdOn: '08 August, 2025',
      status: 'Pending',
      country: 'Mexico',
      city: 'Mexico City',
      bgColor: 'bg-cyan-600'
    },
    {
      id: 23,
      name: 'Christopher Martinez',
      createdOn: '09 August, 2025',
      status: 'Active',
      country: 'India',
      city: 'Mumbai',
      bgColor: 'bg-blue-700'
    },
    {
      id: 24,
      name: 'Amanda Garcia',
      createdOn: '09 August, 2025',
      status: 'Pending',
      country: 'China',
      city: 'Beijing',
      bgColor: 'bg-red-800'
    }
  ];

  const [allUsers, setAllUsers] = useState([]); // All users for stats calculation
  const [filteredUsers, setFilteredUsers] = useState([]); // Users after filtering
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    activeUsers: 0,
    newUsers: 0
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectCurrentPage, setSelectCurrentPage] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    country: '',
    city: '',
    createdOn: '',
    status: ''
  });
  const [currentView, setCurrentView] = useState('list');
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce search term to avoid too many re-renders
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Load initial data (stats and all users)
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        // Set all users
        setAllUsers(mockUsers);
        
        // Calculate stats from all users
        const totalUsers = mockUsers.length;
        const activeUsers = mockUsers.filter(user => user.status === 'Active').length;
        
        setStats({
          total: totalUsers,
          activeUsers: activeUsers,
          newUsers: 250 // Mock data for new users
        });
        
        // Set filtered users for initial display
        setFilteredUsers(mockUsers);
        setTotalPages(Math.ceil(mockUsers.length / 12));
        
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (allUsers.length === 0) return;
    
    let result = [...allUsers];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => 
        statusFilter === 'active' ? user.status === 'Active' : user.status === 'Pending'
      );
    }
    
    // Apply search filter with debounced term - SEARCH IN ALL FIELDS
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchLower) || 
        user.country.toLowerCase().includes(searchLower) ||
        user.city.toLowerCase().includes(searchLower) ||
        user.status.toLowerCase().includes(searchLower) ||
        user.createdOn.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply advanced filters
    if (advancedFilters.country && advancedFilters.country !== 'All Countries') {
      result = result.filter(user => user.country === advancedFilters.country);
    }
    
    if (advancedFilters.city && advancedFilters.city !== 'All Cities') {
      result = result.filter(user => user.city === advancedFilters.city);
    }
    
    if (advancedFilters.status && advancedFilters.status !== 'All Status') {
      result = result.filter(user => user.status === advancedFilters.status);
    }
    
    // Apply createdOn filter (simplified for demo)
    if (advancedFilters.createdOn && advancedFilters.createdOn !== 'All Dates') {
      // This is a simplified implementation for demo purposes
      // In a real app, you would parse the dates and compare them
      result = result.filter(user => user.createdOn.includes('2025'));
    }
    
    setFilteredUsers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allUsers, statusFilter, debouncedSearchTerm, advancedFilters]);

  // Pagination
  const usersPerPage = 12;
  const totalFilteredPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  // Handle selection functions
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectCurrentPage(false);
    if (checked) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectCurrentPage = (checked) => {
    setSelectCurrentPage(checked);
    setSelectAll(false);
    if (checked) {
      setSelectedUsers(paginatedUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
      setSelectAll(false);
      setSelectCurrentPage(false);
    }
  };

  const handleApplyFilters = (filters) => {
    setAdvancedFilters(filters);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setCurrentView('profile');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedUser(null);
  };

  if (currentView === 'profile') {
    return <UserProfile user={selectedUser} onBack={handleBackToList} />;
  }

  return (
    <div className="relative">
      {/* Stats Cards - Only loaded once */}
      <UserStats stats={stats} loading={loading} />
      
      {/* Filters */}
      <UserFilters 
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectAll={selectAll}
        selectCurrentPage={selectCurrentPage}
        onSelectAll={handleSelectAll}
        onSelectCurrentPage={handleSelectCurrentPage}
        onOpenFilter={() => setIsFilterModalOpen(true)}
      />

      {/* User Table - Changes with filters */}
      <UserTable 
        users={paginatedUsers}
        currentPage={currentPage}
        totalPages={totalFilteredPages}
        onPageChange={setCurrentPage}
        selectedUsers={selectedUsers}
        onSelectUser={handleSelectUser}
        onUserClick={handleUserClick}
        loading={loading}
      />

      {/* Filter Modal */}
      <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={advancedFilters}
      />
    </div>
  );
};

export default Users;