// src/components/settings/SettingsMainContent.jsx
import { useMemo, useState, useEffect, useCallback } from 'react';
import { 
  Users,            
  UserCheck,        
  UserCog,        
  User,             
  Megaphone,        
  Headphones,       
  SlidersHorizontal,
} from "lucide-react";
import SearchField from './SearchField.jsx';
import StatsCard from './StatsCard.jsx';
import UserCard from './UserCard.jsx';
import Button from '../signIn/Button.jsx';
import FilterModal from '../Users/modals/FilterModal.jsx';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';
import SettingsService from '../../services/settingsService.js';
import lookupService from '../../services/lookupService.js';
import { useSettings } from '../../context/SettingsContext';

const SettingsMainContent = ({ onAddNewUser, onEditUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [modalFilters, setModalFilters] = useState({}); 
  const [statsData, setStatsData] = useState({});
  const { changeUser } = useSettings();
  const [allCountries, setAllCountries] = useState([]);

  const [filterConfig, setFilterConfig] = useState([
    { key: 'country', label: 'Country', type: 'dropdown', options: [] },
    { key: 'city', label: 'City', type: 'dropdown', options: [], disabled: true },
    { key: 'type', label: 'Type', type: 'dropdown', options: [] },
  ]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [usersData, stats, countryData] = await Promise.all([
          SettingsService.getUsers(),
          SettingsService.getStatistics(),
          lookupService.getCountries(),
        ]);

        setUsers(usersData || []);
        setStatsData(stats || {});
        setAllCountries(countryData || []);

        const countryOptions = countryData ? countryData.map(c => ({ value: c.id, label: c.name })) : [];
        const typeOptions = [
          { value: 0, label: 'SuperAdmin' },
          { value: 1, label: 'Admin' },
          { value: 2, label: 'Marketing' },
          { value: 3, label: 'CustomerSupport' },
        ];

        setFilterConfig(prevConfig => [
          { ...prevConfig[0], options: countryOptions },
          { ...prevConfig[1] }, // City options will be updated on country change
          { ...prevConfig[2], options: typeOptions },
        ]);

      } catch (error) {
        console.error('Failed to fetch initial data or filter options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleOpenFilterModal = () => {
    setModalFilters(appliedFilters); 
    setIsFilterModalOpen(true);
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setIsFilterModalOpen(false);
  };

  const handleLiveFilterChange = (updatedFilters) => {
    setModalFilters(updatedFilters);

    const countryId = updatedFilters.country;
    const currentCountryId = modalFilters.country;

    if (countryId !== currentCountryId) {
      const selectedCountry = allCountries.find(c => c.id === countryId);
      const cityOptions = selectedCountry ? selectedCountry.cities.map(city => ({ value: city.id, label: city.name })) : [];
      
      setFilterConfig(prevConfig => [
        prevConfig[0],
        { ...prevConfig[1], options: cityOptions, disabled: !countryId },
        prevConfig[2],
      ]);

      // Reset city if country changes
      if (updatedFilters.city) {
        setModalFilters(prev => ({ ...prev, city: '' }));
      }
    }
  };

  const getUserRoleDisplayName = useCallback((userRole) => {
    const roleMap = {
      0: 'SuperAdmin',
      1: 'Admin',
      2: 'Marketing',
      3: 'CustomerSupport',
    };
    return roleMap[userRole] || userRole;
  }, []);

  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Apply dropdown filters first
    if (Object.values(appliedFilters).some(v => v)) {
      filtered = filtered.filter(user => {
        return Object.entries(appliedFilters).every(([key, value]) => {
          if (!value) return true; // Ignore empty filters
          if (key === 'type') {
            return user.role === value;
          }
          return String(user[key]) === String(value);
        });
      });
    }

    // Then apply search term filter to the already filtered list
    if (searchTerm) {
      filtered = filtered.filter(user => {
        const searchableContent = [
          user.firstName, 
          user.lastName, 
          user.email, 
          user.mobileNumber, 
          user.countryName, 
          user.cityName,
          getUserRoleDisplayName(user.role)
        ].join(' ').toLowerCase();
        return searchableContent.includes(searchTerm.toLowerCase());
      });
    }

    return filtered;
  }, [users, searchTerm, appliedFilters, getUserRoleDisplayName]);

  const stats = useMemo(() => {
    const totalUsers = filteredUsers.length;
    if (!statsData) return [];
    
    return [
      {
        title: 'Total No. of Users',
        value: statsData.totalNumberOfUsers,
        icon: <Users />,
        iconBackgroundColor: AppColors.purple_600
      },
      {
        title: 'Active Users',
        value: statsData.totalNumberOfActiveUsers,
        icon: <UserCheck />,
        iconBackgroundColor: AppColors.green_600
      },
      {
        title: 'Super Admin',
        value: statsData.totalNumberOfSuperAdmins,
        icon: <UserCog />,
        iconBackgroundColor: AppColors.cyan_600
      },
      {
        title: 'Admin',
        value: statsData.totalNumberOfAdmins,
        icon: <User />,
        iconBackgroundColor: AppColors.blue_600
      },
      {
        title: 'Marketing',
        value: statsData.totalNumberOfMaketingUsers,
        icon: <Megaphone />,
        iconBackgroundColor: AppColors.orange_600
      },
      {
        title: 'Customer Support',
        value: statsData.totalNumberOfCustomerSupportUsers,
        icon: <Headphones />,
        iconBackgroundColor: AppColors.gray_800
      }
    ];
  }, [statsData, filteredUsers]);

  const getUserStats = useCallback(() => {
    const totalUsers = filteredUsers.length;
    const activeUsers = filteredUsers.filter(user => user.status === true).length;
    const inactiveUsers = totalUsers - activeUsers;
    
    // Role-based statistics
    const roleStats = {
      superadmin: filteredUsers.filter(user => user.userRole === 'superadmin').length,
      admin: filteredUsers.filter(user => user.userRole === 'admin').length,
      marketing: filteredUsers.filter(user => user.userRole === 'marketing').length,
      customersupport: filteredUsers.filter(user => user.userRole === 'customersupport').length
    };
  
    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      ...roleStats
    };
  }, [filteredUsers]);

  const deleteUser = useCallback((userId) => {
    try {
      
    } catch (error) {
     
      throw error;
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = () => {
    handleOpenFilterModal();
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleEditUser = (user) => {
    if (onEditUser) {
      onEditUser(user);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        await deleteUser(userId);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (statsData.error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {statsData.error}</p>
          <Button
            onClick={() => window.location.reload()}
            backgroundColor={AppColors.primary}
            borderColor={AppColors.primary}
            textColor={AppColors.white}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 
          className="text-lg font-bold text-black"
          style={AppFonts.lgBold({ color: AppColors.black })}
        >
          System Users
        </h1>
        
        <Button
          onClick={onAddNewUser}
          backgroundColor={AppColors.primary}
          borderColor={AppColors.primary}
          textColor={AppColors.white}
          showIcon={false}
          fullWidth={false}
          variant="addUser"
          className="flex-shrink-0 w-full sm:w-auto"
          style={{
            minWidth: '141px',
            height: '40px',
            borderRadius: '48px'
          }}
        >
          Add New User
        </Button>
      </div>

      {/* Stats Overview */}
      {statsData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconBackgroundColor={stat.iconBackgroundColor}
              className="min-w-0"
            />
          ))}
        </div>
      )}

      <div className="px-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search Field */}
          <SearchField
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:w-auto"
          />

          {/* Filter button */}
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Button
              onClick={handleFilter}
              backgroundColor={AppColors.white}
              borderColor={AppColors.primary}
              textColor={AppColors.primary}
              icon={<SlidersHorizontal className="w-4 h-4" />}
              iconPosition="left"
              showIcon={true}
              fullWidth={false}
              variant="filter"
              className="flex-shrink-0 w-full sm:w-auto"
              style={{
                minWidth: '107px',
                height: '40px',
                borderRadius: '96px'
              }}
            >
              Filter
            </Button>
          </div>
        </div>
      </div>

      <div className="px-0">
        {filteredUsers.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {filteredUsers.map((user, index) => (
              <UserCard
                key={user.id}
                name={user.name || `${user.firstName} ${user.lastName}`.trim()}
                country={`${user.cityName}, ${user.countryName}`}
                email={user.email}
                phone={user.mobileNumber}
                photo={user.image}
                type={user.type}
                countryName={user.countryName}
                cityName={user.cityName}
                birthdate={user.birthdate}
                isActive={user.status === 1}
                role={getUserRoleDisplayName(user.role)}
                onEdit={() => handleEditUser(user)}
                onDelete={() => handleDeleteUser(user.id)}
                isFirst={index === 0}
                isLast={index === filteredUsers.length - 1}
              />
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-12">
            <p 
              className="text-gray-500 mb-4"
              style={AppFonts.mdMedium({ color: AppColors.gray_500 })}
            >
              No users found matching "{searchTerm}"
            </p>
            <p 
              className="text-gray-400 text-sm"
              style={AppFonts.smRegular({ color: AppColors.gray_400 })}
            >
              Try searching by name, email, phone number, country, or role
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p 
              className="text-gray-500 mb-4"
              style={AppFonts.mdMedium({ color: AppColors.gray_500 })}
            >
              No users added yet
            </p>
          </div>
        )}
      </div>

      {searchTerm && (
        <div className="px-0">
          <p 
            className="text-gray-600 text-sm"
            style={AppFonts.smRegular({ color: AppColors.gray_600 })}
          >
            Showing {filteredUsers.length} of {getUserStats().totalUsers} users
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
        onFilterChange={handleLiveFilterChange}
        currentFilters={modalFilters}
        filterConfig={filterConfig}
      />
    </div>
  );
};

export default SettingsMainContent;