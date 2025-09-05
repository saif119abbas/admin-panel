// src/screens/Settings.jsx
import React, { useState } from 'react';
import { UserProvider } from '../context/UserContext.jsx';
import SettingsMainContent from '../components/settings/SettingsMainContent.jsx';
import AddNewUser from '../components/settings/AddNewUser.jsx';

const SettingsContent = () => {
  const [mainContentView, setMainContentView] = useState('users');
  const [editingUser, setEditingUser] = useState(null);

  const handleAddNewUser = () => {
    setEditingUser(null);
    setMainContentView('addUser');
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setMainContentView('addUser');
  };

  const handleBackToUsers = () => {
    setEditingUser(null);
    setMainContentView('users');
  };

  const handleUserFormSubmit = () => {
    setMainContentView('users');
    setEditingUser(null);
  };

  const renderMainContent = () => {
    switch (mainContentView) {
      case 'addUser':
        return (
          <AddNewUser 
            onBack={handleBackToUsers}
            onSubmit={handleUserFormSubmit}
            editingUser={editingUser}
          />
        );
      case 'users':
      default:
        return (
          <SettingsMainContent 
            onAddNewUser={handleAddNewUser}
            onEditUser={handleEditUser}
          />
        );
    }
  };

  return (
    <div className="h-screen bg-white">
      <main className="h-full overflow-y-auto p-3 sm:p-6 bg-white">
        {renderMainContent()}
      </main>
    </div>
  );
};

const Settings = () => {
  return (
    <UserProvider>
      <SettingsContent />
    </UserProvider>
  );
};

export default Settings;