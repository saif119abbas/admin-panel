// src/components/Users/UserProfile.jsx
import { useState, useEffect, useCallback } from 'react';
import { Download, Gift, CircleArrowUp, CircleArrowDown } from 'lucide-react';
import * as XLSX from 'xlsx';
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
import { useUser } from '../../context/UserContext';
import TipReceiverService from '../../services/tipReceiverService';
import lookupService from '../../services/lookupService';
import { formatStatus, formatDate, formatTime } from '../../utils/formatters';

const UserProfile = ({ onBack, onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState('Received');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const { currentUser, setCurrentUser } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bankDetails, setBankDetails] = useState({});
  const [stats, setStats] = useState({});
  const [location, setLocation] = useState('');
  const [bankCountryName, setBankCountryName] = useState('');

  const name = `${currentUser.firstName} ${currentUser.surName}`;

  useEffect(() => {
    const loadInitialData = async () => {
      if (!currentUser?.id) return;
      setLoading(true);
      try {
        const [transData, bankData, stateData, countries] = await Promise.all([
          TipReceiverService.getTransactionsByTipReceiverId(currentUser.id),
          TipReceiverService.getPaymentInfoByTipReceiverId(currentUser.id),
          TipReceiverService.getStatisticsByTipReceiverId(currentUser.id),
          lookupService.getCountries(),
        ]);

        setTransactions(transData || []);
        setBankDetails(bankData || {});
        setStats(stateData || {});

        const country = countries.find(c => c.id === currentUser.countryId);
        const city = country?.cities.find(ci => ci.id === currentUser.cityId);
        setLocation(city ? `${city.name}, ${country.name}` : country ? country.name : '');

        const bankCountry = countries.find(c => c.id === bankData.countryId);
        setBankCountryName(bankCountry ? bankCountry.name : '');

      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, [currentUser.id, currentUser.countryId, currentUser.cityId]);

  const handleUserUpdate = async (updatedUserData) => {
    const response = await TipReceiverService.updateTipReceiverById(currentUser.id, updatedUserData);
    if(response) {
      setCurrentUser({ ...currentUser, ...updatedUserData });
    }
    if (onUserUpdate) {
      onUserUpdate(updatedUserData);
    }
    setIsEditModalOpen(false);
  };

  const handleDownload = () => {
    const transactionsToExport = getCurrentTransactions();
    if (transactionsToExport.length === 0) {
      alert('No transactions to export.');
      return;
    }

    const data = transactionsToExport.map(t => ({
      'Date': formatDate(t.createdAt),
      'Time': formatTime(t.createdAt),
      'Status': t.statusName,
      'Amount': t.amount,
      'Currency': currentUser.currency,
      'Balance': t.balance?.toFixed(2) || '0.00',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, `${currentUser.firstName}_${currentUser.surName}_Transactions.xlsx`);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const getCurrentTransactions = useCallback(() => {
    console.log("transactions",transactions);
    const filtered = transactions.filter(t => {
      let statusName = t.status == 1 ? "Pending" : "Processed";
      t.statusName = statusName;
      return (activeTab === 'Received' ? t.status == 1 : t.status == 2) &&
      (statusName.toLowerCase().includes(searchTerm.toLowerCase()) || t.amount.toString().includes(searchTerm))
    });
    return filtered;
  }, [transactions, activeTab, searchTerm]);

  const getGroupedTransactions = useCallback(() => {
    const currentTransactions = getCurrentTransactions();
    return currentTransactions.reduce((acc, transaction) => {
      const date = formatDate(transaction.date);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {});
  }, [getCurrentTransactions]);

  const getTransactionColor = (type) => type === 'Sending' ? 'text-danger' : 'text-success';
  const getStatusColor = (status) => status == 1 ? 'text-warning' : 'text-success';

  const getStatusStyle = (isPending) => ({
    backgroundColor: isPending ? AppColors.status.pending.background : AppColors.status.active.background,
    color: isPending ? AppColors.status.pending.text : AppColors.status.active.text,
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 text-sm">
          <button onClick={onBack} className="text-text hover:text-gray-800 transition-colors">
            All Users
          </button>
          <span className="text-text">/</span>
          <span className="text-primary text-sm font-bold">{name}</span>
        </div>
        <ActionButton variant="primary" icon={Gift} onClick={() => setIsRewardModalOpen(true)}>
          Reward
        </ActionButton>
      </div>

      <div className="bg-dark_bg rounded-2xl p-4 md:p-6 relative overflow-hidden min-h-[172px]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full opacity-5"></div>
          <div className="absolute bottom-4 right-10 md:right-20 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full opacity-5"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center gap-4 h-full">
            <div className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-[110px] md:h-[110px] lg:w-[137px] lg:h-[137px] rounded-xl md:rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center overflow-hidden">
              {currentUser?.image ? (
                <img src={currentUser.image} alt={name} className="w-full h-full object-cover rounded-xl md:rounded-2xl" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">{`${currentUser.firstName?.[0] || ''}${currentUser.lastName?.[0] || ''}`}</span>
                </div>
              )}
            </div>

            <div className="text-white space-y-1 md:space-y-2 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <h1 className="text-lg sm:text-h4 font-bold truncate">{name}</h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-md font-semibold w-fit" style={getStatusStyle(currentUser?.isPending)}>
                  {formatStatus(currentUser?.isPending)}
                </span>
              </div>
              <p className="text-gray-300 text-sm md:text-md">
                Created on {formatDate(currentUser?.createdAt)}
              </p>
              <p className="text-gray-300 text-sm md:text-md">
                {location}
              </p>
              <p className="text-gray-300 text-sm md:text-md">
                {currentUser?.mobileNumber}
              </p>
              <div className="mt-1">
                <ActionButton variant="outline" size="small" onClick={() => setIsEditModalOpen(true)} className="!text-primary !border-primary hover:!bg-primary hover:!text-white !w-[90px] !h-[28px]">
                  Edit Info
                </ActionButton>
              </div>
            </div>
          </div>

          <div className="flex justify-start w-full sm:w-auto mt-2 sm:mt-0">
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 w-full sm:min-w-[300px] md:w-[338px] h-[137px] flex items-center relative overflow-hidden" style={{ backgroundImage: `url(${maskImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <div className="flex items-center space-x-3 flex-1 relative z-10">
                <div className="w-16 h-16 md:w-[89px] md:h-[89px] bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <img src={logoWithoutNameImage} alt="Wallet Icon" className="w-8 h-7 md:w-[44.5px] md:h-[41px]" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-gray-600 text-sm md:text-md font-medium">Wallet Balance</p>
                  <p className="text-secondary text-base md:text-h3 lg:text-2xl font-bold mb-1">{currentUser.currency} {stats.walletBalance.toFixed(2)}</p>
                  <ActionButton variant="primary" size="small" onClick={() => setIsQRModalOpen(true)} className="!w-[80px] !h-[28px]">
                    View QR
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr] gap-1">
        <div>
          <BankDetailsCard bankData={bankDetails} bankCountryName={bankCountryName} />
        </div>

        <div className="order-1 lg:order-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{currentUser.currency} {stats.totalReceivedAmount.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Received Amount</p>
                </div>
                <IconBadge icon={CircleArrowDown} bgClass="bg-success" iconClass="text-white" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{currentUser.currency} {stats.totalRequestedAmount || '0.00'}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Requested Amount</p>
                </div>
                <IconBadge icon={CircleArrowUp} bgClass="bg-red-500" iconClass="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden border-b-2">
            <div className="bg-gray-50 px-6 py-3 h-10 flex items-center rounded-xl">
              <div className="flex space-x-2">
                <ActionButton variant={activeTab === 'Received' ? 'primary' : 'secondary'} size="small" onClick={() => setActiveTab('Received')} className={activeTab === 'Received' ? '' : '!bg-transparent !text-gray-700 !border-0'}>
                  Received
                </ActionButton>
                <ActionButton variant={activeTab === 'Redeemed' ? 'primary' : 'secondary'} size="small" onClick={() => setActiveTab('Redeemed')} className={activeTab === 'Redeemed' ? '' : '!bg-transparent !text-gray-700 !border-0'}>
                  Redeemed
                </ActionButton>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="flex items-center justify-between gap-4">
                <SearchField searchTerm={searchTerm} onSearchChange={handleSearchChange} placeholder="Search" width="w-[259px]" height="h-[38px]" />
                <ActionButton variant="outline" icon={Download} onClick={handleDownload} size="small">
                  Download
                </ActionButton>
              </div>
            </div>

            <div className="bg-white border-b-2 border-gray-200">
              <div className="grid grid-cols-3 px-6 py-3">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Amount</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Balance</div>
              </div>
            </div>

            <div className="bg-white">
              {Object.entries(getGroupedTransactions()).map(([date, transactions], groupIndex) => (
                <div key={date}>
                  {transactions.map((transaction, index) => (
                    <div key={transaction.id} className="grid grid-cols-3 px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div>
                          {index === 0 && (
                            <p className="text-sm font-medium text-gray-900 mb-1">{date}</p>
                          )}
                          <p className="text-sm text-gray-600">{formatDate(transaction.createdAt)}</p>
                          <p className="text-sm text-gray-600">{formatTime(transaction.createdAt)}</p>
                          <p className={`text-xs ${getStatusColor(transaction.status)}`}>{transaction.statusName}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <span className={`text-sm font-semibold ${getTransactionColor(transaction.statusName)}`}>{transaction.amount}</span>
                        <p className="text-xs text-gray-500">{currentUser.currency}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-sm font-medium text-gray-900">{transaction.balance?.toFixed(2) || '0.00'}</span>
                        <p className="text-xs text-gray-500">{currentUser.currency}</p>
                      </div>
                    </div>
                  ))}
                  {groupIndex < Object.entries(getGroupedTransactions()).length - 1 && (
                    <div className="border-b-2 border-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <EditUserModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={currentUser} onSave={handleUserUpdate} />
      <QRCodeModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} user={currentUser} />
      <RewardModal isOpen={isRewardModalOpen} onClose={() => setIsRewardModalOpen(false)} user={currentUser} />
    </div>
  );
};

export default UserProfile;