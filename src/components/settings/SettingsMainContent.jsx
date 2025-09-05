// src/components/settings/SettingsMainContent.jsx
import React, { useMemo, useState } from 'react';
import { 
  Users,            
  UserCheck,        
  UserCog,        
  User,             
  Megaphone,        
  Headphones,       
  SlidersHorizontal
} from "lucide-react";
import { useUser } from '../../context/UserContext.jsx';
import SearchField from './SearchField.jsx';
import StatsCard from './StatsCard.jsx';
import UserCard from './UserCard.jsx';
import Button from '../signIn/Button.jsx';
import FilterModal from '../Users/modals/FilterModal.jsx';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const SettingsMainContent = ({ onAddNewUser, onEditUser }) => {
  // Filter modal state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    country: '',
    city: '',
    createdOn: '',
    status: ''
  });

  // Get user context data and actions
  const {
    filteredUsers,
    searchTerm,
    setSearchTerm,
    deleteUser,
    getUserRoleDisplayName,
    getUserStats,
    loading,
    error
  } = useUser();

  // Calculate statistics using context
  const stats = useMemo(() => {
    const userStats = getUserStats();
    
    return [
      {
        title: 'Total No. of Users',
        value: userStats.totalUsers.toString(),
        icon: <Users />,
        iconBackgroundColor: AppColors.purple_600
      },
      {
        title: 'Active Users',
        value: userStats.activeUsers.toString(),
        icon: <UserCheck />,
        iconBackgroundColor: AppColors.green_600
      },
      {
        title: 'Super Admin',
        value: userStats.superadmin.toString(),
        icon: <UserCog />,
        iconBackgroundColor: AppColors.cyan_600
      },
      {
        title: 'Admin',
        value: userStats.admin.toString(),
        icon: <User />,
        iconBackgroundColor: AppColors.blue_600
      },
      {
        title: 'Marketing',
        value: userStats.marketing.toString(),
        icon: <Megaphone />,
        iconBackgroundColor: AppColors.orange_600
      },
      {
        title: 'Customer Support',
        value: userStats.customersupport.toString(),
        icon: <Headphones />,
        iconBackgroundColor: AppColors.gray_800
      }
    ];
  }, [getUserStats]);

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

    //  just store them in state for now for the filter modal
    console.log('Applied filters:', filters);
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
                country={`${user.cityDisplay || user.city}, ${user.countryDisplay || user.country}`}
                email={user.emailAddress}
                phone={user.phoneNumber}
                photo={user.avatar}
                status={getUserRoleDisplayName(user.userRole)}
                isActive={user.status}
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
        currentFilters={appliedFilters}
      />
    </div>
  );
};

export default SettingsMainContent;