// src/components/CustomerSupport/TicketDetailsCard.jsx
import  { useState } from "react";
import { ChevronDown } from "lucide-react";
import StatusChangeConfirmationModal from "../CustomerSupport/modals/StatusChangeConfirmationModal";
import SupportService from "../../services/supportService";

const statusOptions = [
  { 
    value: "pending", 
    label: "Pending", 
    color: "#FFA726", 
    bgColor: "#FFF3E0"
   },
  {
    value: "in-progress",
    label: "In Progress",
    color: "#42A5F5",
    bgColor: "#E3F2FD",
  },
  {
    value: "resolved",
    label: "Resolved",
    color: "#66BB6A",
    bgColor: "#E8F5E8",
  },
  { value: "closed", label: "Closed", color: "#EF5350", bgColor: "#FFEBEE" },
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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingStatus] = useState(null);

  const getCurrentStatusStyle = () => {
    const currentStatus = statusOptions.find(
      (opt) => opt.value === selectedStatus
    );
    return currentStatus || statusOptions[0];
  };

  const [currentStatusStyle] = useState(getCurrentStatusStyle());

  const handleStatusChange = (newStatus) => {
    console.log(newStatus)
    if (newStatus !== selectedStatus) {
      setSelectedStatus(newStatus);
    }
    setShowStatusDropdown(false);
  };

  const handleConfirmStatusChange = () => {
    setSelectedStatus(pendingStatus);
    setIsConfirmModalOpen(false);
    if (onStatusChange) {
      onStatusChange(pendingStatus);
    }
  };

  const handleSave = async() => {
    const data={
      id,
      number:ticketNumber,
      createdOn,
      resolvedOn,
      statedBy,
      issueType,
      status:selectedStatus

    }
    const res=await SupportService.updateTikcet(id,data)
    console.log("Saving status:", res);
  };

  return (
    <div className="w-full  p-4 justify-between">
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
              Stated By
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
            <p className="text-gray-900">{createdOn}</p>
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
            <p className="text-gray-900">{resolvedOn || "-"}</p>
          </div>
          <div className="flex items-end justify-between bg-white p-6 rounded-2xl">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                  style={currentStatusStyle}
                >
                  {selectedStatus}
                  <ChevronDown size={14} />
                </button>

                {showStatusDropdown && (
                  <div className={`absolute  top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]`}>
                    {statusOptions.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => handleStatusChange(option.label)}
                        /* onClick={() => {
                          
                          setSelectedStatus(option);
                          setShowStatusDropdown(false);
                        }}*/
                        className={` text-[${option.color}] block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleSave}
              className="ml-4 bg-primary text-white px-6 py-2 rounded-full font-medium transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <StatusChangeConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmStatusChange}
        newStatus={
          statusOptions.find((opt) => opt.value === pendingStatus)?.label
        }
      />
    </div>
  );
};

export default TicketDetailsCard;
