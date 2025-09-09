import { useState, useEffect } from 'react';
import TicketHeader from './TicketHeader';
import TicketUserCard from './TicketUserCard';
import TicketDetailsCard from './TicketDetailsCard';
import ReasonMessageSection from './ReasonMessageSection';
import RewardModal from '../Users/modals/RewardModal';
import supportService from "../../services/supportService"
import LoadingSpinner from '../Users/common/LoadingSpinner';
import { formatTicketSubject } from '../../utils/formatters';

const Ticket = ({ ticket, onBack, onStatusChange }) => {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const userData = await supportService.getUser(ticket.userId);
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ticket?.userId) {
      loadInitialData();
    }
  }, [ticket?.userId]);

  const handleRewardClick = () => {
    setIsRewardModalOpen(true);
  };

  const handleStatusChange = (ticketId, newStatus) => {
    console.log('Status changed to:', newStatus);
    // Pass the status change up to the parent component
    if (onStatusChange) {
      onStatusChange(ticketId, newStatus);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
        <span className="ml-2">Loading ticket details...</span>
      </div>
    );
  }

  if (!user || !ticket) {
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

  return (
    <div style={{ padding: '8px' }} className="space-y-4">
      {/* Ticket Header */}
      <TicketHeader
        ticketId={ticket.ticketId}
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
          ticketNumber={ticket.ticketId}
          createdOn={ticket.createdAt}
          resolvedOn={ticket.lastUpdatedAt}
          startedBy={ticket.username}
          issueType={formatTicketSubject(ticket.issueType)}
          status={ticket.status}
          statedBy={ticket.username}
          id={ticket.id}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Reason & Message Section */}
      <ReasonMessageSection
        reason={ticket.reasonMessage}
      />

      {/* Reward Modal */}
      {user && (
        <RewardModal
          isOpen={isRewardModalOpen}
          onClose={() => setIsRewardModalOpen(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default Ticket;