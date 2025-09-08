// src/hooks/usePermissions.js
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { hasPermission, getPermittedPages, canAccessMarketing } from '../utils/rolePermissions';

export const usePermissions = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [permittedPages, setPermittedPages] = useState([]);

  useEffect(() => {
    if (user && user.role !== undefined) {
      setUserRole(user.role);
      setPermittedPages(getPermittedPages(user.role));
    } else {
      setUserRole(null);
      setPermittedPages([]);
    }
  }, [user]);

  return {
    userRole,
    permittedPages,
    hasPermission: (page) => hasPermission(userRole, page),
    canAccessMarketing: () => canAccessMarketing(userRole),
    canAccessPage: (page) => hasPermission(userRole, page)
  };
};