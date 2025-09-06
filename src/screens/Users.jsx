// src/screens/Users.jsx
import { useState, useEffect } from 'react';
import UserTable from '../components/Users/UserTable';
import UserStats from '../components/Users/UserStats';
import UserFilters from '../components/Users/UserFilters';
import FilterModal from '../components/Users/modals/FilterModal';
import UserProfile from '../components/Users/UserProfile';
import '../App.css';
import { useUser } from '../context/UserContext';
import TipReceiverService from '../services/tipReceiverService';

const Users = () => {

  const {allUsers,setAllUsers,stats, setStats,selectedUser,setSelectedUser}=useUser()
  const [filteredUsers, setFilteredUsers] = useState([]); // Users after filtering
  const [loading, setLoading] = useState(true);

  
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
      await new Promise(resolve => setTimeout(resolve, 500));
      try {
        const users=await TipReceiverService.getTipReceivers({})
        setAllUsers(users);
        const newStats=await TipReceiverService.getStatistics()
        
        setStats({
          total: newStats.totalNumberOfUsers,
          activeUsers: newStats.totalNumberOfActiveUsers,
          newUsers: newStats.totalNumberOfPendingUsers 
        });
        
        setFilteredUsers(allUsers);
        
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
    if (allUsers===undefined ||  allUsers.length === 0) return;
    
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

  const handleUserClick = async (user) => {
    const data=await TipReceiverService.getTipReceiverById(user.id)
    console.log(data)
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