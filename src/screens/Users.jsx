// src/screens/Users.jsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import UserTable from '../components/Users/UserTable';
import UserStats from '../components/Users/UserStats';
import UserFilters from '../components/Users/UserFilters';
import FilterModal from '../components/Users/modals/FilterModal';
import UserProfile from '../components/Users/UserProfile';
import '../App.css';
import { useUser } from '../context/UserContext';
import TipReceiverService from '../services/tipReceiverService';
import lookupService from '../services/lookupService';

const Users = () => {
  const { allUsers, setAllUsers, stats, setStats, selectedUser, setSelectedUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [modalFilters, setModalFilters] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [filterConfig, setFilterConfig] = useState([
    { key: 'country', label: 'Country', type: 'dropdown', options: [] },
    { key: 'status', label: 'Status', type: 'dropdown', options: [] },
  ]);
  const [currentView, setCurrentView] = useState('list');

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [usersData, statsData, countryData] = await Promise.all([
          TipReceiverService.getTipReceivers({}),
          TipReceiverService.getStatistics(),
          lookupService.getCountries(),
        ]);

        setAllUsers(usersData || []);
        setStats(statsData || {});
        setAllCountries(countryData || []);

        const countryOptions = countryData ? countryData.map(c => ({ value: c.id, label: c.name })) : [];
        const statusOptions = [
          { value: 'Active', label: 'Active' },
          { value: 'Pending', label: 'Pending' },
        ];

        setFilterConfig([
          { key: 'country', label: 'Country', type: 'dropdown', options: countryOptions },
          { key: 'status', label: 'Status', type: 'dropdown', options: statusOptions },
        ]);

      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const getCountryNameById = useCallback((countryId) => {
    if (!allCountries.length) return countryId;
    const country = allCountries.find(c => c.id === countryId);
    return country ? country.name : countryId;
  }, [allCountries]);

  const processedUsers = useMemo(() => {
    let filtered = allUsers;

    if (Object.values(appliedFilters).some(v => v)) {
      filtered = filtered.filter(user => {
        return Object.entries(appliedFilters).every(([key, value]) => {
          if (!value) return true;
          if (key === 'country') return user.countryId === value;
          if (key === 'status') {
            const isPending = value === 'Pending';
            return user.isPending === isPending;
          }
          return String(user[key]).toLowerCase() === String(value).toLowerCase();
        });
      });
    }

    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        Object.values(user).some(val =>
          String(val).toLowerCase().includes(searchLower)
        )
      );
    }

    return filtered.map(user => ({ ...user, countryName: getCountryNameById(user.countryId) }));
  }, [allUsers, appliedFilters, debouncedSearchTerm, getCountryNameById]);

  const usersPerPage = 12;
  const totalFilteredPages = Math.ceil(processedUsers.length / usersPerPage);
  const paginatedUsers = processedUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handleSelectAll = useCallback((checked) => {
    setSelectedUsers(checked ? processedUsers.map(u => u.id) : []);
  }, [processedUsers]);

  const handleSelectCurrentPage = useCallback((checked) => {
    setSelectedUsers(checked ? paginatedUsers.map(u => u.id) : []);
  }, [paginatedUsers]);

  const handleSelectUser = useCallback((userId, checked) => {
    setSelectedUsers(prev => checked ? [...prev, userId] : prev.filter(id => id !== userId));
  }, []);

  const handleOpenFilterModal = useCallback(() => {
    setModalFilters(appliedFilters);
    setIsFilterModalOpen(true);
  }, [appliedFilters]);

  const handleApplyFilters = useCallback((filters) => {
    setAppliedFilters(filters);
    setIsFilterModalOpen(false);
  }, []);

  const handleLiveFilterChange = useCallback((updatedFilters) => {
    setModalFilters(updatedFilters);
  }, []);

  const handleUserClick = useCallback(async (user) => {
    const data = await TipReceiverService.getTipReceiverById(user.id);
    setSelectedUser(data);
    setCurrentView('profile');
  }, [setSelectedUser]);

  const handleBackToList = useCallback(() => {
    setCurrentView('list');
    setSelectedUser(null);
  }, [setSelectedUser]);

  if (currentView === 'profile') {
    return <UserProfile user={selectedUser} onBack={handleBackToList} />;
  }

  return (
    <div className="relative">
      <UserStats stats={stats} loading={loading} />
      <UserFilters 
        onSearchChange={setSearchTerm}
        onOpenFilter={handleOpenFilterModal}
      />
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
      <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        onFilterChange={handleLiveFilterChange}
        currentFilters={modalFilters}
        filterConfig={filterConfig}
      />
    </div>
  );
};

export default Users;