// src/utils/rolePermissions.js
export const USER_ROLES = {
  SUPER_ADMIN: 0,
  ADMIN: 1,
  MARKETING: 2,
  CUSTOMER_SUPPORT: 3
};

export const ROLE_NAMES = {
  [USER_ROLES.SUPER_ADMIN]: 'Super Admin',
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.MARKETING]: 'Marketing',
  [USER_ROLES.CUSTOMER_SUPPORT]: 'Customer Support'
};

export const PAGES = {
  DASHBOARD: 'dashboard',
  USERS: 'users',
  CUSTOMER_SUPPORT: 'support',
  MARKETING_ALL_TEMPLATES: 'all-templates',
  MARKETING_CREATE_TEMPLATES: 'create-templates',
  MARKETING_SEND_NOTIFICATIONS: 'send-notifications',
  SETTINGS: 'settings'
};

// Define permissions for each role
export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: [
    PAGES.DASHBOARD,
    PAGES.USERS,
    PAGES.CUSTOMER_SUPPORT,
    PAGES.MARKETING_ALL_TEMPLATES,
    PAGES.MARKETING_CREATE_TEMPLATES,
    PAGES.MARKETING_SEND_NOTIFICATIONS,
    PAGES.SETTINGS
  ],
  [USER_ROLES.ADMIN]: [
    PAGES.USERS,
    PAGES.CUSTOMER_SUPPORT,
    PAGES.MARKETING_ALL_TEMPLATES,
    PAGES.MARKETING_CREATE_TEMPLATES,
    PAGES.MARKETING_SEND_NOTIFICATIONS,
    PAGES.SETTINGS
  ],
  [USER_ROLES.MARKETING]: [
    PAGES.MARKETING_ALL_TEMPLATES,
    PAGES.MARKETING_CREATE_TEMPLATES,
    PAGES.MARKETING_SEND_NOTIFICATIONS
  ],
  [USER_ROLES.CUSTOMER_SUPPORT]: [
    PAGES.CUSTOMER_SUPPORT
  ]
};

// Helper function to check if user has permission for a specific page
export const hasPermission = (userRole, page) => {
  if (userRole === undefined || userRole === null) return false;
  return ROLE_PERMISSIONS[userRole]?.includes(page) || false;
};

// Get all permitted pages for a user role
export const getPermittedPages = (userRole) => {
  if (userRole === undefined || userRole === null) return [];
  return ROLE_PERMISSIONS[userRole] || [];
};

// Check if user can access marketing features
export const canAccessMarketing = (userRole) => {
  return hasPermission(userRole, PAGES.MARKETING_ALL_TEMPLATES) ||
         hasPermission(userRole, PAGES.MARKETING_CREATE_TEMPLATES) ||
         hasPermission(userRole, PAGES.MARKETING_SEND_NOTIFICATIONS);
};

// Get role name by role value
export const getRoleName = (roleValue) => {
  return ROLE_NAMES[roleValue] || 'Unknown Role';
};