// src/components/CustomerSupport/Ticket.jsx
import { useState } from 'react';
import TicketHeader from './TicketHeader';
import TicketUserCard from './TicketUserCard';
import TicketDetailsCard from './TicketDetailsCard';
import ReasonMessageSection from './ReasonMessageSection';
import RewardModal from '../Users/modals/RewardModal';

const Ticket = ({ ticketData }) => {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);

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

  const currentTicket = ticketData || defaultTicketData;

  const handleRewardClick = () => {
    setIsRewardModalOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    console.log('Status changed to:', newStatus);
  };

  return (
    <div style={{ padding: '8px' }} className="space-y-4"> {/* Changed from space-y-6 to space-y-4 for 16px spacing */}
      {/* Ticket Header */}
      <TicketHeader 
        ticketId={currentTicket.ticketId}
        onRewardClick={handleRewardClick}
      />

      {/* User Card */}
      <TicketUserCard 
        userImage={currentTicket.user.image}
        userName={currentTicket.user.name}
        location={currentTicket.user.location}
        phoneNumber={currentTicket.user.phoneNumber}
        status={currentTicket.user.status}
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
          ticketNumber={currentTicket.ticketDetails.ticketNumber}
          createdOn={currentTicket.ticketDetails.createdOn}
          resolvedOn={currentTicket.ticketDetails.resolvedOn}
          startedBy={currentTicket.ticketDetails.startedBy}
          issueType={currentTicket.ticketDetails.issueType}
          status={currentTicket.ticketDetails.status}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Reason & Message Section */}
      <ReasonMessageSection 
        reason={currentTicket.reasonMessage}
      />

      {/* Reward Modal */}
      <RewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        user={currentTicket.user}
      />
    </div>
  );
};

export default Ticket;