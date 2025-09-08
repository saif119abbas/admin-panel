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
import ConfirmationModal from '../ConfirmationModal.jsx';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';
import SettingsService from '../../services/settingsService.js';

const SettingsMainContent = ({ onAddNewUser, onEditUser }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [error, setError] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    country: '',
    city: '',
    createdOn: '',
    status: ''
  });

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const users = await SettingsService.getUsers({});
        setFilteredUsers(users);
        const stats = await SettingsService.getStatistics();
        setStatsData(stats);
      } catch (error) {
        console.error('Error loading initial data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Calculate statistics using the fetched data
  const stats = useMemo(() => {
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
        value: statsData.totalNumberOfSuperAdmin,
        icon: <UserCog />,
        iconBackgroundColor: AppColors.cyan_600
      },
      {
        title: 'Admin',
        value: statsData.totalNumberOfAdmin,
        icon: <User />,
        iconBackgroundColor: AppColors.blue_600
      },
      {
        title: 'Marketing',
        value: statsData.totalNumberOfMarekting,
        icon: <Megaphone />,
        iconBackgroundColor: AppColors.orange_600
      },
      {
        title: 'Customer Support',
        value: statsData.totalNumberOfSupport,
        icon: <Headphones />,
        iconBackgroundColor: AppColors.gray_800
      }
    ];
  }, [statsData]);

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

  const deleteUser = useCallback(async (userId) => {
    try {
      setIsDeleting(true);
      await SettingsService.deleteUser(userId);
      
      // Remove the user from the local state
      setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      // Refresh statistics
      const stats = await SettingsService.getStatistics();
      setStatsData(stats);
      
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const getUserRoleDisplayName = useCallback((userRole) => {
    const roleMap = {
      'superadmin': 'Super Admin',
      'admin': 'Admin', 
      'marketing': 'Marketing',
      'customersupport': 'Customer Support'
    };
    return roleMap[userRole] || userRole;
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    console.log('Applied filters:', filters);
  };

  const handleEditUser = (user) => {
    if (onEditUser) {
      onEditUser(user);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      await deleteUser(userToDelete.id);
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      // Error is already handled in deleteUser function
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
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

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
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
                key={index}
                name={user.name || `${user.firstName} ${user.lastName}`.trim()}
                country={`${user.cityDisplay || user.city}, ${user.countryDisplay || user.country}`}
                email={user.email}
                phone={user.mobileNumber}
                photo={user.image}
                status={getUserRoleDisplayName(user.role)}
                isActive={user.status}
                onEdit={() => handleEditUser(user)}
                onDelete={() => handleDeleteClick(user)}
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
        currentFilters={appliedFilters}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete ? userToDelete.name || `${userToDelete.firstName} ${userToDelete.lastName}`.trim() : 'this user'}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default SettingsMainContent;