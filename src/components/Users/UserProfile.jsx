// src/components/Users/UserProfile.jsx
import { useState } from 'react';
import { Download, Gift, Pencil, CircleArrowUp, CircleArrowDown } from 'lucide-react';
import EditUserModal from './modals/EditUserModal';
import QRCodeModal from './modals/QRCodeModal';
import ActionButton from './common/ActionButton';
import SearchField from './common/SearchField';
import logoWithoutNameImage from '../../assets/images/logoWithoutName.png';
import maskImage from '../../assets/images/MaskWallet.png';
import BankDetailsCard from "./BankDetailsCard";
import IconBadge from "./common/IconBadge";
import RewardModal from './modals/RewardModal';
import AppColors from '../../utils/AppColors';

const UserProfile = ({ user, onBack, onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState('Received');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const name=`${currentUser.firstName} ${currentUser.lastName}`

  // Handle user update from modal
  const handleUserUpdate = (updatedUserData) => {
    // Update the local state
    setCurrentUser(updatedUserData);
    if (onUserUpdate) {
      onUserUpdate(updatedUserData);
    }
    setIsEditModalOpen(false);
  };

  // Handle search change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    // You can add your search logic here
    console.log('Search term:', value);
  };
  const receivedTransactions = [
    {
      id: 1,
      date: '10 May',
      time: '12:06 PM',
      type: 'Receiving',
      amount: '+1200',
      currency: 'SAR',
      balance: 6090,
      status: 'Pending'
    },
    {
      id: 2,
      date: '10 May',
      time: '10:47 AM',
      type: 'Receiving',
      amount: '+100',
      currency: 'SAR',
      balance: 4890,
      status: 'Processed'
    },
    {
      id: 3,
      date: '30 April',
      time: '09:00 PM',
      type: 'Receiving',
      amount: '+600',
      currency: 'SAR',
      balance: 4790,
      status: 'Pending'
    },
    {
      id: 4,
      date: '28 April',
      time: '01:30 PM',
      type: 'Receiving',
      amount: '+100',
      currency: 'SAR',
      balance: 4290,
      status: 'Processed'
    },
    {
      id: 5,
      date: '28 April',
      time: '11:43 PM',
      type: 'Receiving',
      amount: '+50',
      currency: 'SAR',
      balance: 4190,
      status: 'Processed'
    }
  ];

  const redeemedTransactions = [
    {
      id: 6,
      date: '12 May',
      time: '03:20 PM',
      type: 'Sending',
      amount: '-200',
      currency: 'SAR',
      balance: 5940,
      status: 'Pending'
    },
    {
      id: 7,
      date: '11 May',
      time: '11:15 AM',
      type: 'Sending',
      amount: '-150',
      currency: 'SAR',
      balance: 6140,
      status: 'Processed'
    },
    {
      id: 8,
      date: '09 May',
      time: '04:30 PM',
      type: 'Sending',
      amount: '-75',
      currency: 'SAR',
      balance: 6290,
      status: 'Processed'
    }
  ];

  // Get current transactions based on active tab
  const getCurrentTransactions = () => {
    return activeTab === 'Received' ? receivedTransactions : redeemedTransactions;
  };

  // Group transactions by date
  const getGroupedTransactions = () => {
    const transactions = getCurrentTransactions();
    const grouped = {};
    
    transactions.forEach(transaction => {
      if (!grouped[transaction.date]) {
        grouped[transaction.date] = [];
      }
      grouped[transaction.date].push(transaction);
    });
    
    return grouped;
  };

  const getTransactionColor = (type) => {
    return type === 'Sending' ? 'text-danger' : 'text-success';
  };

  const getStatusColor = (status) => {
    return status === 'Pending' ? 'text-warning' : 'text-success';
  };

  const getStatusStyle = (status) => {
    if (status === 'Active') {
      return {
        backgroundColor: AppColors.status.active.background,
        color: AppColors.status.active.text
      };
    } else {
      return {
        backgroundColor: AppColors.status.pending.background,
        color: AppColors.status.pending.text
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb with Reward Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 text-sm">
          <button 
            onClick={onBack}
            className="text-text hover:text-gray-800 transition-colors"
          >
            All Users
          </button>
          <span className="text-text">/</span>
          <span className="text-primary text-sm font-bold">{name || 'Barbara Gordon'}</span>
        </div>
        
        {/* Reward Button - Updated to use ActionButton */}
        <ActionButton
          variant="primary"
          icon={Gift}
          onClick={() => setIsRewardModalOpen(true)}
        >
          Reward
        </ActionButton>
      </div>

      {/* Main Header Panel*/}
      <div className="bg-dark_bg rounded-2xl p-4 md:p-6 relative overflow-hidden min-h-[172px]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full opacity-5"></div>
          <div className="absolute bottom-4 right-10 md:right-20 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full opacity-5"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left Side - User Info */}
          <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center gap-4 h-full">
            {/* User Image - Responsive Sizing */}
            <div className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-[110px] md:h-[110px] lg:w-[137px] lg:h-[137px] rounded-xl md:rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center overflow-hidden">
              {currentUser?.image ? (
                <img
                  src={currentUser.image}
                  alt={name || 'Barbara Gordon'}
                  className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                    alt="Barbara Gordon"
                    className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                  />
                </div>
              )}
            </div>

            {/* User Details*/}
            <div className="text-white space-y-1 md:space-y-2 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <h1 className="text-lg sm:text-h4 font-bold truncate">{name || 'Barbara Gordon'}</h1>
                <span 
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-md font-semibold w-fit"
                  style={getStatusStyle(currentUser?.status || 'Active')}
                >
                  {currentUser?.status || 'Active'}
                </span>
              </div>
              <p className="text-gray-300 text-sm md:text-md">
                Created on {currentUser?.createdOn || '03 August, 2025'}
              </p>
              <p className="text-gray-300 text-sm md:text-md">
                {currentUser?.city || 'Dubai'}, {currentUser?.country || 'United Arab Emirates'}
              </p>
              <p className="text-gray-300 text-sm md:text-md">
                {currentUser?.phoneNumber || '+971 12 345 6789'}
              </p>
              {/* Edit Info Button */}
              <div className="mt-1">
                <ActionButton
                  variant="outline"
                  size="small"
                  onClick={() => setIsEditModalOpen(true)}
                  className="!text-primary !border-primary hover:!bg-primary hover:!text-white !w-[90px] !h-[28px]"
                >
                  Edit Info
                </ActionButton>
              </div>
            </div>
          </div>

          {/* Right Side - Wallet Balance */}
          <div className="flex justify-start w-full sm:w-auto mt-2 sm:mt-0">
            <div 
              className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 w-full sm:min-w-[300px] md:w-[338px] h-[137px] flex items-center relative overflow-hidden"
              style={{
                backgroundImage: `url(${maskImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Content */}
              <div className="flex items-center space-x-3 flex-1 relative z-10">
                <div className="w-16 h-16 md:w-[89px] md:h-[89px] bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <img
                    src={logoWithoutNameImage} 
                    alt="Wallet Icon"
                    className="w-8 h-7 md:w-[44.5px] md:h-[41px]"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-gray-600 text-sm md:text-md font-medium">Wallet Balance</p>
                  <p className="text-secondary text-base md:text-h3 lg:text-2xl font-bold mb-1">SAR 5,140</p>
                  <ActionButton
                    variant="primary"
                    size="small"
                    onClick={() => setIsQRModalOpen(true)}
                    className="!w-[80px] !h-[28px]"
                  >
                    View QR
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout matching the image: Bank Details on left, Stats + Transactions on right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr] gap-1">
        {/* Left Column - Bank Details */}
        <div>
          <BankDetailsCard
            bankName="Emirates NBD"
            accountHolder={currentUser?.name || "Barbara Gordon"}
            country="United Arab Emirates"
            iban="AE070331234567890126543"
            headerIcon={<Pencil className="w-5 h-5 text-primary" />}
          />
        </div>

        {/* Right Section - Stats Cards + Transactions */}
        <div className="order-1 lg:order-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Total Received */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">SAR 12,340</p>
                  <p className="text-sm text-gray-600 mt-1">Total Received Amount</p>
                </div>
                <IconBadge
                  icon={CircleArrowDown}
                  bgClass="bg-success"
                  iconClass="text-white"
                />
              </div>
            </div>

            {/* Total Requested */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">SAR 9,200</p>
                  <p className="text-sm text-gray-600 mt-1">Total Requested Amount</p>
                </div>
                <IconBadge
                  icon={CircleArrowUp}
                  bgClass="bg-red-500"
                  iconClass="text-white"
                />
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white overflow-hidden border-b-2">
            {/* Tabs Section */}
            <div className="bg-gray-50 px-6 py-3 h-10 flex items-center rounded-xl">
              <div className="flex space-x-2">
                <ActionButton
                  variant={activeTab === 'Received' ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setActiveTab('Received')}
                  className={activeTab === 'Received' ? '' : '!bg-transparent !text-gray-700 !border-0'}
                >
                  Received
                </ActionButton>
                <ActionButton
                  variant={activeTab === 'Redeemed' ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setActiveTab('Redeemed')}
                  className={activeTab === 'Redeemed' ? '' : '!bg-transparent !text-gray-700 !border-0'}
                >
                  Redeemed
                </ActionButton>
              </div>
            </div>

            {/* Search and Download Section */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between gap-4">
                {/* Search */}
                <SearchField
                  searchTerm={searchTerm}
                  onSearchChange={handleSearchChange}
                  placeholder="Search"
                  width="w-[259px]"
                  height="h-[38px]"
                />
                
                {/* Download Button */}
                <ActionButton
                  variant="outline"
                  icon={Download}
                  onClick={() => console.log('Download clicked')}
                  size="small"
                >
                  Download
                </ActionButton>
              </div>
            </div>

            {/* Table Headers */}
            <div className="bg-white border-b-2 border-gray-200">
              <div className="grid grid-cols-3 px-6 py-3">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Amount
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Balance
                </div>
              </div>
            </div>

            {/* Grouped Transactions */}
            <div className="bg-white">
              {Object.entries(getGroupedTransactions()).map(([date, transactions], groupIndex) => (
                <div key={date}>
                  {/* Transaction rows for this date */}
                  {transactions.map((transaction, index) => (
                    <div key={transaction.id} className="grid grid-cols-3 px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div>
                          {index === 0 && (
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              {transaction.date}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            {transaction.time}
                          </p>
                          <p className={`text-xs ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <span className={`text-sm font-semibold ${getTransactionColor(transaction.type)}`}>
                          {transaction.amount}
                        </span>
                        <p className="text-xs text-gray-500">{transaction.currency}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-sm font-medium text-gray-900">
                          {transaction.balance}
                        </span>
                        <p className="text-xs text-gray-500">{transaction.currency}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Separator line between date groups (except for the last group) */}
                  {groupIndex < Object.entries(getGroupedTransactions()).length - 1 && (
                    <div className="border-b-2 border-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={currentUser}
        onSave={handleUserUpdate}
      />
      
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        user={currentUser}
      />
      
      <RewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        user={currentUser}
      />
    </div>
  );
};

export default UserProfile;