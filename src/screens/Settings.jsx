// src/screens/Settings.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import AppHeader from '../components/settings/AppHeader.jsx';
import SettingsMainContent from '../components/settings/SettingsMainContent.jsx';
import AddNewUser from '../components/settings/AddNewUser.jsx';

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('settings');
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
    <div className="flex h-screen bg-white relative">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-3 sm:p-6 bg-white">
          {renderMainContent()}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Settings;