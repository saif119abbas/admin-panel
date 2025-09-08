// src/components/CustomerSupport/Ticket.jsx
import { useState, useEffect } from 'react';
import TicketHeader from './TicketHeader';
import TicketUserCard from './TicketUserCard';
import TicketDetailsCard from './TicketDetailsCard';
import ReasonMessageSection from './ReasonMessageSection';
import RewardModal from '../Users/modals/RewardModal';
import SupportService from "../../services/supportService"
import LoadingSpinner from '../Users/common/LoadingSpinner';

const Ticket = ({ ticket, onBack }) => {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const userData = await SupportService.getUser(ticket.id);
        console.log("user Data", userData);
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [ticket.id]);

  const handleRewardClick = () => {
    setIsRewardModalOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    console.log('Status changed to:', newStatus);
  };

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
        <span className="ml-2">Loading ticket details...</span>
      </div>
    );
  }

  // Show error state if user data failed to load
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load ticket details</p>
          <button
            onClick={onBack}
            className="bg-primary text-white px-4 py-2 rounded-full"
          >
            Back to Tickets
          </button>
        </div>
      </div>
    );
  }

  console.log("user ticket========", user);

  return (
    <div style={{ padding: '8px' }} className="space-y-4">
      {/* Ticket Header */}
      <TicketHeader 
        ticketNumber={ticket.number}
        onRewardClick={handleRewardClick}
        onBack={onBack}
      />

      {/* User Card */}
      <TicketUserCard 
        userImage={user.image}
        userName={user.name}
        location={user.countryId}
        phoneNumber={user.mobileNumber}
        status={user.status}
        statedBy={user.statedBy}
      />

      {/* Ticket Details Section */}
      <div 
        className="rounded-2xl p-6"
        style={{ 
          border: '1px solid #F0F0F0',
          borderRadius: '16px',
          backgroundColor: '#F4F8FB'
        }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Ticket Details
        </h2>
        
        <TicketDetailsCard 
          ticketNumber={ticket.number}
          createdOn={ticket.createdOn}
          resolvedOn={ticket.resolvedOn}
          statedBy={ticket.statedBy}
          issueType={ticket.issueType}
          status={ticket.status}
          id={ticket.id}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Reason & Message Section */}
      <ReasonMessageSection 
        reason={ticket.reasonMessage}
      />

      {/* Reward Modal */}
      <RewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default Ticket;