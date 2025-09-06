// src/components/settings/SettingsMainContent.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { 
  Users,            
  UserCheck,        
  UserCog,        
  User,             
  Megaphone,        
  Headphones,       
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useUser } from '../../context/UserContext.jsx';
import SearchField from './SearchField.jsx';
import StatsCard from './StatsCard.jsx';
import UserCard from './UserCard.jsx';
import Button from '../signIn/Button.jsx';
import FilterModal from '../Users/modals/FilterModal.jsx';
import DeleteConfirmationModal from './DeleteConfirmationModal.jsx';
import AppColors from '../../utils/AppColors.js';

const SettingsMainContent = ({ onAddNewUser, onEditUser }) => {
  // Filter modal state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    status: '',
    type: ''
  });

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get user context data and actions
  const {
    filteredUsers,
    searchTerm,
    setSearchTerm,
    deleteUser,
    getUserRoleDisplayName,
    getUserStats,
    loading,
    error,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    refreshUsers,
    getCountryName,
    getCityName
  } = useUser();

  // Calculate statistics using context
  const stats = useMemo(() => {
    const userStats = getUserStats();
    
    return [
      {
        title: 'Total No. of Users',
        value: (userStats.totalUsers || 0).toString(),
        icon: <Users />,
        iconBackgroundColor: AppColors.purple_600
      },
      {
        title: 'Active Users',
        value: (userStats.activeUsers || 0).toString(),
        icon: <UserCheck />,
        iconBackgroundColor: AppColors.green_600
      },
      {
        title: 'Super Admin',
        value: (userStats.superadmin || 0).toString(),
        icon: <UserCog />,
        iconBackgroundColor: AppColors.cyan_600
      },
      {
        title: 'Admin',
        value: (userStats.admin || 0).toString(),
        icon: <User />,
        iconBackgroundColor: AppColors.blue_600
      },
      {
        title: 'Marketing',
        value: (userStats.marketing || 0).toString(),
        icon: <Megaphone />,
        iconBackgroundColor: AppColors.orange_600
      },
      {
        title: 'Customer Support',
        value: (userStats.customersupport || 0).toString(),
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
    // TODO: Apply filters to the API call
    refreshUsers();
    setIsFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    setAppliedFilters({
      status: '',
      type: ''
    });
    // TODO: Clear filters in the API call
    refreshUsers();
  };

  const handleDeleteUser = async (user) => {
    console.log('handleDeleteUser called with user:', user);
    if (!user || !user.id) {
      console.error('Invalid user object or missing ID');
      return;
    }
    console.log('Setting userToDelete to:', user.id);
    console.log('Setting isDeleteModalOpen to true');
    setUserToDelete(user.id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteUser(userToDelete);
      // Refresh the user list after deletion
      refreshUsers();
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  // Show loading state
  if (loading && !filteredUsers.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconBackgroundColor={stat.iconBackgroundColor}
          />
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <SearchField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search users..."
          className="w-full md:w-80"
        />
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            onClick={handleFilter}
            variant="outline"
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </Button>
          <Button onClick={onAddNewUser}>
            Add New User
          </Button>
        </div>
      </div>

      {/* Applied Filters */}
      {(appliedFilters.status || appliedFilters.type) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filters:</span>
          {appliedFilters.status && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Status: {appliedFilters.status}
            </span>
          )}
          {appliedFilters.type && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Type: {getUserRoleDisplayName(appliedFilters.type)}
            </span>
          )}
          <button
            onClick={handleClearFilters}
            className="text-xs text-red-600 hover:text-red-800"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={onEditUser}
                onDelete={handleDeleteUser}
                getUserRoleDisplayName={getUserRoleDisplayName}
                getCountryName={getCountryName}
                getCityName={getCityName}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found</p>
              <button
                onClick={onAddNewUser}
                className="mt-2 text-primary-600 hover:text-primary-800"
              >
                Add your first user
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(pagination.pageNumber - 1)}
                disabled={pagination.pageNumber === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.pageNumber + 1)}
                disabled={pagination.pageNumber === pagination.totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(pagination.pageNumber - 1) * pagination.pageSize + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.pageNumber * pagination.pageSize, pagination.totalCount)}
                  </span>{' '}
                  of <span className="font-medium">{pagination.totalCount}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(pagination.pageNumber - 1)}
                    disabled={pagination.pageNumber === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.pageNumber <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.pageNumber >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.pageNumber - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          pagination.pageNumber === pageNum
                            ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(pagination.pageNumber + 1)}
                    disabled={pagination.pageNumber === pagination.totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
        currentFilters={appliedFilters}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        userId={userToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default SettingsMainContent;