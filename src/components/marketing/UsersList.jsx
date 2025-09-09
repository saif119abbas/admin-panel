import { useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import LoadingSpinner from '../Users/common/LoadingSpinner';

const UsersList = ({ 
  users, 
  currentPage, 
  totalPages, 
  onPageChange, 
  selectedUsers, 
  onSelectUser, 
  onUserClick,
  handleSelectAll,
  loading = false ,
  onOpen,
  filters
}) => {
  console.log("filters=====",filters)
  const generateAvatar = (name) => {
    const words = name.split(' ');
    
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    
    return words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      if (totalPages > 1) pages.push(totalPages);
    }

    return pages;
  };

  const avatarColors = useMemo(() => [
    'bg-purple-500', 'bg-yellow-500', 'bg-green-500', 'bg-red-500',
    'bg-gray-500', 'bg-red-600', 'bg-blue-500', 'bg-pink-500',
    'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'
  ], []);

  const getAvatarColor = (userId) => {
    return avatarColors[userId % avatarColors.length];
  };

  if (loading && users.length === 0) {
    return (
      <div className="bg-white p-8 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {/* Search and Filter Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedUsers.length === users.length && users.length > 0}
              onChange={handleSelectAll}
              className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2"
            />
            <span className="ml-2 text-sm font-medium text-gray-900">Select All</span>
          </label>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <button 
          onClick={onOpen}
          
          className="flex items-center space-x-2 px-3 py-2 border border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition-colors">
            <Filter size={16} />
            <span className="text-sm font-medium">Filter</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Country</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">City</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onUserClick && onUserClick(user)}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        onSelectUser(user.id, e.target.checked);
                      }}
                      className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2 mr-3"
                    />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 ${user.image ? '' : getAvatarColor(user.id)} mr-3`}>
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-white">
                          {generateAvatar(user.name)}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.country}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-start space-x-2">
            {generatePageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...' || loading}
                className={`w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors ${
                  page === currentPage
                    ? 'bg-cyan-500 text-white'
                    : page === '...'
                    ? 'text-gray-500 cursor-default'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;