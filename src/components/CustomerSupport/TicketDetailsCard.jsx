// src/components/CustomerSupport/TicketDetailsCard.jsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ActionButton from '../Users/common/ActionButton';
import StatusChangeConfirmationModal from '../CustomerSupport/modals/StatusChangeConfirmationModal';

const TicketDetailsCard = ({ 
  ticketNumber,
  createdOn,
  resolvedOn,
  startedBy,
  issueType,
  status,
  onStatusChange
}) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: '#FFA726', bgColor: '#FFF3E0' },
    { value: 'in-progress', label: 'In Progress', color: '#42A5F5', bgColor: '#E3F2FD' },
    { value: 'resolved', label: 'Resolved', color: '#66BB6A', bgColor: '#E8F5E8' },
    { value: 'closed', label: 'Closed', color: '#EF5350', bgColor: '#FFEBEE' }
  ];

  const getCurrentStatusStyle = () => {
    const currentStatus = statusOptions.find(opt => opt.value === selectedStatus);
    return currentStatus || statusOptions[0];
  };

  const handleStatusChange = (newStatus) => {
    if (newStatus !== selectedStatus) {
      setPendingStatus(newStatus);
      setIsConfirmModalOpen(true);
    }
    setShowStatusDropdown(false);
  };

  const handleConfirmStatusChange = () => {
    setSelectedStatus(pendingStatus);
    setShowSaveButton(true);
    setIsConfirmModalOpen(false);
    if (onStatusChange) {
      onStatusChange(pendingStatus);
    }
  };

  const handleSave = () => {
    setShowSaveButton(false);
    // Here typically make an API call to save the status
    console.log('Saving status:', selectedStatus);
  };

  const currentStatusStyle = getCurrentStatusStyle();

  return (
    <div 
      className="w-full bg-white rounded-2xl"
      style={{ 
        border: '1px solid #F0F0F0',
        borderRadius: '16px',
        padding: '16px'
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* First Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Ticket Number
            </label>
            <p className="text-gray-900 font-semibold">
              #{ticketNumber}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Started By
            </label>
            <p className="text-gray-900">
              {startedBy}
            </p>
          </div>
        </div>

        {/* Second Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Created On
            </label>
            <p className="text-gray-900">
              {createdOn}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Issue Type
            </label>
            <p className="text-gray-900">
              {issueType}
            </p>
          </div>
        </div>

        {/* Third Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Resolved On
            </label>
            <p className="text-gray-900">
              {resolvedOn || '-'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Status
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="flex items-center justify-between w-full px-0 py-1 text-sm font-medium bg-transparent border-none"
                  style={{
                    color: currentStatusStyle.color
                  }}
                >
                  <span>{currentStatusStyle.label}</span>
                  <ChevronDown className="w-4 h-4" style={{ marginLeft: '4px' }} />
                </button>

                {showStatusDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleStatusChange(option.value)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg whitespace-nowrap"
                        style={{
                          color: option.color
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {showSaveButton && (
                <ActionButton
                  variant="primary"
                  onClick={handleSave}
                  className="h-8 px-4 text-xs ml-2"
                >
                  Save
                </ActionButton>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Change Confirmation Modal */}
      <StatusChangeConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmStatusChange}
        newStatus={statusOptions.find(opt => opt.value === pendingStatus)?.label}
      />
    </div>
  );
};

export default TicketDetailsCard;