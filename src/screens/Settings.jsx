// src/screens/Settings.jsx
import  { useState } from 'react';
import { UserProvider } from '../context/UserContext.jsx';
import SettingsMainContent from '../components/settings/SettingsMainContent.jsx';
import AddNewUser from '../components/settings/AddNewUser.jsx';
import { useSettings } from '../context/SettingsContext.js';
import SettingsService from '../services/settingsService.js';

const SettingsContent = () => {
  const [mainContentView, setMainContentView] = useState('users');
  const {changeUser}=useSettings()

  const handleAddNewUser = () => {
    changeUser(null);
    setMainContentView('addUser');
  };

  const handleEditUser = (user) => {
    changeUser(user);
    setMainContentView('addUser');
  };

  const handleBackToUsers = () => {
    changeUser(null);
    setMainContentView('users');
  };

  const handleUserFormSubmit = () => {
    setMainContentView('users');
    changeUser(null);
  };
  const handleUpdateUser=async(id,user)=>{
    console.log("handleUpdateUser ")
    const res=await SettingsService.updateUser(id,user)
    console.log(res)
  }
  const handleAddUser=async(user)=>{
    const res=await SettingsService.createUser(user)
    console.log(res)
  }

  const renderMainContent = () => {
    switch (mainContentView) {
      case 'addUser':
        return (
          <AddNewUser 
            onBack={handleBackToUsers}
            onSubmit={handleUserFormSubmit}
            updateUser={handleUpdateUser}
            addUser={handleAddUser}
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
      <main className="h-full overflow-y-auto bg-white">
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