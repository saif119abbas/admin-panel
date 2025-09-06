// src/components/settings/UserCard.jsx
import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Edit2 } from 'lucide-react';
import CircleButton from './CircleButton.jsx';
import AppColors from '../../utils/AppColors.js';
import AppFonts from '../../utils/AppFonts.js';

const UserCard = ({ 
  user, 
  onEdit, 
  onDelete, 
  getUserRoleDisplayName,
  getCountryName,
  getCityName,
  className = ""
}) => {
  const { 
    id,
    fullName,
    firstName,
    lastName,
    email = 'No email provided',
    type = 0,
    status = 0,
    country,
    city,
    mobileNumber,
    birthdate
  } = user || {};

  // Use fullName or construct from firstName + lastName
  const displayName = fullName || `${firstName || ''} ${lastName || ''}`.trim() || 'Unknown User';
  
  // Use mobileNumber for phone display
  const displayPhone = mobileNumber;

  const [countryName, setCountryName] = useState('Loading...');
  const [cityName, setCityName] = useState('Loading...');

  useEffect(() => {
    const loadCountryName = async () => {
      if (country && getCountryName) {
        try {
          const name = await getCountryName(country);
          setCountryName(name || 'Unknown');
        } catch (error) {
          console.error('Error loading country name:', error);
          setCountryName('Unknown');
        }
      } else {
        setCountryName('Not specified');
      }
    };

    loadCountryName();
  }, [country, getCountryName]);

  useEffect(() => {
    const loadCityName = async () => {
      if (city && getCityName) {
        try {
          const name = await getCityName(city);
          setCityName(name || 'Unknown');
        } catch (error) {
          console.error('Error loading city name:', error);
          setCityName('Unknown');
        }
      } else {
        setCityName('Not specified');
      }
    };

    loadCityName();
  }, [city, getCityName]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getStatusColor = (status) => {
    if (status === 1 || status === 'Active') return 'text-green-600 bg-green-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusText = (status) => {
    if (status === 1 || status === 'Active') return 'Active';
    return 'Inactive';
  };

  const getRoleColor = (type) => {
    const roleColors = {
      0: 'text-purple-600 bg-purple-100', // Super Admin
      1: 'text-blue-600 bg-blue-100',     // Admin
      2: 'text-orange-600 bg-orange-100', // Marketing
      3: 'text-green-600 bg-green-100',   // Customer Support
      '0': 'text-purple-600 bg-purple-100',
      '1': 'text-blue-600 bg-blue-100',
      '2': 'text-orange-600 bg-orange-100',
      '3': 'text-green-600 bg-green-100'
    };
    return roleColors[type] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* User Name and Email */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {displayName}
            </h3>
            <p className="text-gray-600 text-sm">
              {email}
            </p>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Phone Number */}
            {displayPhone && (
              <div className="flex items-center text-sm">
                <span className="mr-2">📞</span>
                <span className="text-gray-700">{displayPhone}</span>
              </div>
            )}

            {/* Birth Date */}
            {birthdate && (
              <div className="flex items-center text-sm">
                <span className="mr-2">🎂</span>
                <span className="text-gray-700">{formatDate(birthdate)}</span>
              </div>
            )}

            {/* Location */}
            <div className="flex items-center text-sm col-span-2">
              <span className="mr-2">📍</span>
              <span className="text-gray-700">
                {cityName}, {countryName}
              </span>
            </div>
          </div>

          {/* Status and Role Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {getStatusText(status)}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(type)}`}>
              {getUserRoleDisplayName ? getUserRoleDisplayName(type) : `Type ${type}`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit && onEdit(user)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit User"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete && onDelete(user)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete User"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;