// src/screens/Settings.jsx
import React, { useState } from 'react';
import SettingsMainContent from '../components/settings/SettingsMainContent.jsx';
import AddNewUser from '../components/settings/AddNewUser.jsx';

const Settings = () => {
  const [mainContentView, setMainContentView] = useState('users');
  const [users, setUsers] = useState([]); // Dynamic users list
  const [editingUser, setEditingUser] = useState(null); // User being edited

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

  const handleSubmitUser = (userData) => {
    if (editingUser) {
      // Update existing user
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === editingUser.id 
            ? { ...userData, id: editingUser.id }
            : user
        )
      );
    } else {
      // Add new user
      const newUser = {
        ...userData,
        id: Date.now(), // Simple ID generation
      };
      setUsers(prevUsers => [...prevUsers, newUser]);
    }
    setMainContentView('users');
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const renderMainContent = () => {
    switch (mainContentView) {
      case 'addUser':
        return (
          <AddNewUser 
            onBack={handleBackToUsers}
            onSubmit={handleSubmitUser}
            editingUser={editingUser}
          />
        );
      case 'users':
      default:
        return (
          <SettingsMainContent 
            onAddNewUser={handleAddNewUser}
            users={users}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
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

export default Settings;