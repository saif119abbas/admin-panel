// src/components/CustomerSupport/Ticket.jsx
import { useState, useEffect } from 'react';
import TicketHeader from './TicketHeader';
import TicketUserCard from './TicketUserCard';
import TicketDetailsCard from './TicketDetailsCard';
import ReasonMessageSection from './ReasonMessageSection';
import RewardModal from '../Users/modals/RewardModal';
import supportService from "../../services/supportService"
import LoadingSpinner from '../Users/common/LoadingSpinner';
const defaultTicketData = {
  ticketId: 'TCK-00123',
  user: {
    name: 'Barbara Gordon',
    image: null,
    location: 'Dubai, United Arab Emirates',
    phoneNumber: '+971 12 345 6789',
    status: 'Active'
  },
  ticketDetails: {
    ticketNumber: 'TCK-00123',
    createdOn: '25 Jul 2025, 4:00 PM',
    resolvedOn: null,
    startedBy: 'Barbara Gordon',
    issueType: 'Tip Issue',
    status: 'in-progress'
  },
  reasonMessage: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
};

const Ticket = ({ ticket, onBack }) => {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const userData = await supportService.getUser(ticket.id)
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
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
        <span className="ml-2">Loading ticket details...</span>
      </div>
    );
  }
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
          startedBy={ticket.statedBy}
          issueType={ticket.issueType}
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
      <RewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default Ticket;