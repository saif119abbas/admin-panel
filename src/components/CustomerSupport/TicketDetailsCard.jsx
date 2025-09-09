// src/components/CustomerSupport/TicketDetailsCard.jsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import StatusChangeConfirmationModal from "../CustomerSupport/modals/StatusChangeConfirmationModal";
import SupportService from "../../services/supportService";
import { formatDate, formatTime } from "../../utils/formatters";

const statusOptions = [
  { 
    value: 1, 
    label: "Pending", 
    color: "#FFA726", 
    bgColor: "#FFF3E0"
  },
  {
    value: 2,
    label: "In Progress",
    color: "#42A5F5",
    bgColor: "#E3F2FD",
  },
  {
    value: 3,
    label: "Resolved",
    color: "#66BB6A",
    bgColor: "#E8F5E8",
  },
  { 
    value: 4, 
    label: "Closed", 
    color: "#EF5350", 
    bgColor: "#FFEBEE" 
  },
];

const TicketDetailsCard = ({
  ticketNumber,
  createdOn,
  resolvedOn,
  statedBy,
  issueType,
  status,
  onStatusChange,
  id
}) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [tempStatus, setTempStatus] = useState(status);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const getCurrentStatusStyle = (statusValue) => {
    const currentStatus = statusOptions.find(
      (opt) => opt.value === statusValue
    );
    return currentStatus || statusOptions[0];
  };

  const currentStatusStyle = getCurrentStatusStyle(tempStatus);

  const handleStatusSelect = (newStatusValue) => {
    if (newStatusValue !== selectedStatus) {
      setTempStatus(newStatusValue);
    }
    setShowStatusDropdown(false);
  };

  const handleConfirmStatusChange = async () => {
    setIsConfirmModalOpen(false);

    setIsUpdating(true);
    try {
      const response = await SupportService.updateTicket(id, tempStatus);

      if (response.success) {
        setSelectedStatus(tempStatus);
        if (onStatusChange) {
          onStatusChange(id, tempStatus);
        }
      } else {
        console.error("Failed to update status:", response.error);
        setTempStatus(selectedStatus); 
        alert("Failed to update ticket status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
      setTempStatus(selectedStatus);
      alert("An error occurred while updating the ticket status.");
    } finally {
      setIsUpdating(false);
    }
  };


  const handleCancelStatusChange = () => {
    setIsConfirmModalOpen(false);
    setTempStatus(selectedStatus); 
  };


  const handleSave = async() => {
    if (selectedStatus === status) {
      console.log("No changes to save");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await SupportService.updateTicket(id, selectedStatus);
      
      if (response.success) {
        console.log("Status updated successfully:", response.data);
        // Notify parent component about the status change
        if (onStatusChange) {
          onStatusChange(id, selectedStatus);
        }
      } else {
        console.error("Failed to update status:", response.error);
        // Revert to original status on failure
        setSelectedStatus(status);
        alert("Failed to update ticket status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
      // Revert to original status on error
      setSelectedStatus(status);
      alert("An error occurred while updating the ticket status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    return `${formatDate(dateString)}, ${formatTime(dateString)}`;
  };

  return (
    <div className="w-full p-4 justify-between">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* First Column */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Ticket Number
            </label>
            <p className="text-gray-900 font-semibold">#{ticketNumber}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Started By
            </label>
            <p className="text-gray-900">{statedBy}</p>
          </div>
        </div>

        {/* Second Column */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Created On
            </label>
            <p className="text-gray-900">{formatDateTime(createdOn)}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Issue Type
            </label>
            <p className="text-gray-900">{issueType}</p>
          </div>
        </div>

        {/* Third Column */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Resolved On
            </label>
            <p className="text-gray-900">{formatDateTime(resolvedOn)}</p>
          </div>
          
          <div className="flex items-end justify-between bg-white p-6 rounded-2xl">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  disabled={isUpdating}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: currentStatusStyle.bgColor,
                    color: currentStatusStyle.color
                  }}
                >
                  {currentStatusStyle.label}
                  <ChevronDown size={14} />
                </button>

                {showStatusDropdown && !isUpdating && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px]">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleStatusSelect(option.value)}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                        style={{ color: option.color }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

        {tempStatus !== selectedStatus && (
          <button
            onClick={() => setIsConfirmModalOpen(true)} 
            disabled={isUpdating}
            className="ml-4 bg-primary text-white px-6 py-2 rounded-full font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary_700"
          >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
          )}
          </div>
        </div>
      </div>

      <StatusChangeConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelStatusChange}
        onConfirm={handleConfirmStatusChange}
        newStatus={statusOptions.find((opt) => opt.value === pendingStatus)?.label}
      />
    </div>
  );
};

export default TicketDetailsCard;