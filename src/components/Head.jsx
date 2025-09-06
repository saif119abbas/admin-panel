import { useState } from 'react';
import AppColors from '../utils/AppColors';
import ActionButton from '../components/Users/common/ActionButton';
import { Gift } from 'lucide-react'; // missing import!

export default function Head({ onBack, currentUser }) {
  const [username /*, setUsername*/] = useState('Barbara Gordon');
  const [status /*,setSatus*/] = useState("Active");
  const [createdOn /*, setCreatedOn*/] = useState("03 August, 2025");
  const [image /*, setImage*/] = useState(null);
  const [city /*, setCity*/] = useState("Dubai");
  const [country /*, setCountry*/] = useState("United Arab Emirates");
  const [phoneNumber /*, setPhoneNumber*/] = useState("+971 12 345 6789");
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);

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
    <>
      {/* Top Breadcrumb + Reward Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 text-sm">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            All Users
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-primary font-sm">
            {currentUser?.name || 'Barbara Gordon'}
          </span>
        </div>

        {/* Reward Button */}
        <ActionButton
          variant="primary"
          icon={Gift}
          onClick={() => setIsRewardModalOpen(true)}
        >
          Reward
        </ActionButton>
      </div>

      {/* Main Header Panel */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-4 md:p-6 relative overflow-hidden min-h-[172px]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full opacity-5"></div>
          <div className="absolute bottom-4 right-10 md:right-20 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full opacity-5"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center gap-4 h-full">
            {/* User Image */}
            <div className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-[110px] md:h-[110px] lg:w-[137px] lg:h-[137px] rounded-xl md:rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt={username || 'Barbara Gordon'}
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

            {/* User Details */}
            <div className="text-white space-y-1 md:space-y-2 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <h1 className="text-lg sm:text-xl font-bold truncate">
                  {username || 'Barbara Gordon'}
                </h1>
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-md font-semibold w-fit"
                  style={getStatusStyle(status || 'Active')}
                >
                  {status || 'Active'}
                </span>
              </div>
              <p className="text-gray-300 text-xs md:text-sm">
                Created on {createdOn || '03 August, 2025'}
              </p>
              <p className="text-gray-300 text-xs md:text-sm">
                {city || 'Dubai'}, {country || 'United Arab Emirates'}
              </p>
              <p className="text-gray-300 text-xs md:text-sm font-medium">
                {phoneNumber || '+971 12 345 6789'}
              </p>
            </div>
          </div>
        </div>
    </div>

    </>
  );
}
