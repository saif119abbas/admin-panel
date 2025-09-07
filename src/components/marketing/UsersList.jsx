// src/components/Users/UserTable.jsx
import { useMemo } from 'react';
import LoadingSpinner from '../Users/common/LoadingSpinner';

const UsersList = ({ 
  users, 
  currentPage, 
  totalPages, 
  onPageChange, 
  selectedUsers, 
  onSelectUser, 
  onUserClick,
  loading = false 
}) => {
  const generateAvatar = (name) => {
    const words = name.split(' ');
    
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    
    return words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
  };

  const getStatusColor = (status) => {
    return status === 'Active'
      ? 'text-success'
      : 'text-orange-600';
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
    <div >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200 rounded-t-lg rounded-b-lg">
            <tr>
              <th className="px-6 py-3 w-16 rounded-tl-lg rounded-bl-lg"></th>
              <th className="px-6 py-3 text-left text-md font-bold text-black">Name</th>
              <th className="px-6 py-3 text-left text-md font-bold text-black">Email</th>
              <th className="px-6 py-3 text-left text-md font-bold text-black">Phone</th>
              <th className="px-6 py-3 text-left text-md font-bold text-black rounded-tr-lg rounded-br-lg">Country</th>
              <th className="px-6 py-3 text-left text-md font-bold text-black ">City</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0 cursor-pointer" onClick={() => onUserClick && onUserClick(user)}>
                <td className="px-6 py-4 w-16">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => onSelectUser(user.id, e.target.checked)}
                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 ${user.image ? '' : getAvatarColor(user.id)}`}>
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-md font-semibold text-white">
                          {generateAvatar(user.name)}
                        </span>
                      )}
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => onUserClick && onUserClick(user)}
                        className="text-md text-text text-left"
                      >
                        {user.name}
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-md text-text">{user.createdOn}</td>
                <td className="px-6 py-4 text-md">
                  <span className={getStatusColor(user.status)}>{user.status}</span>
                </td>
                <td className="px-6 py-4 text-md text-text">{user.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-start space-x-2">
          {generatePageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...' || loading}
              className={`w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors ${
                page === currentPage
                  ? 'bg-primary text-white'
                  : page === '...'
                  ? 'text-black cursor-default'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;