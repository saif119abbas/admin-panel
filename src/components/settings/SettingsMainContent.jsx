// src/components/settings/SettingsMainContent.jsx
import React, { useState, useMemo } from 'react';
import { Users, UserCheck, Shield, TrendingUp, Headphones } from 'lucide-react';
import SearchField from './SearchField.jsx';
import StatsCard from './StatsCard.jsx';
import UserCard from './UserCard.jsx';
import Button from '../signIn/Button.jsx';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';
import filterIcon from '../../assets/icons/trash.svg';

const SettingsMainContent = ({ onAddNewUser, users, onEditUser, onDeleteUser }) => {
  const [searchValue, setSearchValue] = useState('');

  // Calculate stats based on dynamic users
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.status === true).length;
    const superAdmins = users.filter(user => user.userRole === 'superadmin').length;
    const admins = users.filter(user => user.userRole === 'admin').length;
    const marketing = users.filter(user => user.userRole === 'marketing').length;
    const customerSupport = users.filter(user => user.userRole === 'customersupport').length;

    return [
      {
        title: 'Total No. of Users',
        value: totalUsers.toString(),
        icon: <Users />,
        iconBackgroundColor: AppColors.purple_600
      },
      {
        title: 'Active Users',
        value: activeUsers.toString(),
        icon: <UserCheck />,
        iconBackgroundColor: AppColors.green_600
      },
      {
        title: 'Super Admin',
        value: superAdmins.toString(),
        icon: <Shield />,
        iconBackgroundColor: AppColors.cyan_600
      },
      {
        title: 'Admin',
        value: admins.toString(),
        icon: <Shield />,
        iconBackgroundColor: AppColors.blue_600
      },
      {
        title: 'Marketing',
        value: marketing.toString(),
        icon: <TrendingUp />,
        iconBackgroundColor: AppColors.orange_600
      },
      {
        title: 'Customer Support',
        value: customerSupport.toString(),
        icon: <Headphones />,
        iconBackgroundColor: AppColors.gray_800
      }
    ];
  }, [users]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const handleEditUser = (user) => {
    if (onEditUser) {
      onEditUser(user);
    }
  };

  const handleDeleteUser = (userId) => {
    if (onDeleteUser) {
      onDeleteUser(userId);
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(user => {
    const searchTerm = searchValue.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchTerm) ||
      user.emailAddress?.toLowerCase().includes(searchTerm) ||
      user.firstName?.toLowerCase().includes(searchTerm) ||
      user.lastName?.toLowerCase().includes(searchTerm) ||
      user.userRole?.toLowerCase().includes(searchTerm)
    );
  });

  // Helper function to get role display name
  const getRoleDisplayName = (userRole) => {
    const roleMap = {
      'superadmin': 'Super Admin',
      'admin': 'Admin', 
      'marketing': 'Marketing',
      'customersupport': 'Customer Support'
    };
    return roleMap[userRole] || userRole;
  };

  return (
    <div className="space-y-6">
      {/* Page Title and Add New User Button */}
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

      {/* Search and Filter Section */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search Field */}
          <SearchField
            placeholder="Search"
            value={searchValue}
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
              icon={filterIcon}
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

      {/* User Cards Section */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
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
                status={getRoleDisplayName(user.userRole)}
                isActive={user.status}
                onEdit={() => handleEditUser(user)}
                onDelete={() => handleDeleteUser(user.id)}
                isFirst={index === 0}
                isLast={index === filteredUsers.length - 1}
              />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <p 
              className="text-gray-500 mb-4"
              style={AppFonts.mdMedium({ color: AppColors.gray_500 })}
            >
              No users added yet
            </p>
            <Button
              onClick={onAddNewUser}
              backgroundColor={AppColors.primary}
              borderColor={AppColors.primary}
              textColor={AppColors.white}
              showIcon={false}
              fullWidth={false}
              variant="addUser"
            >
              Add Your First User
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <p 
              className="text-gray-500"
              style={AppFonts.mdMedium({ color: AppColors.gray_500 })}
            >
              No users found matching your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsMainContent;