// src/components/CustomerSupport/Ticket.jsx
import { useState,useEffect } from 'react';
import TicketHeader from './TicketHeader';
import TicketUserCard from './TicketUserCard';
import TicketDetailsCard from './TicketDetailsCard';
import ReasonMessageSection from './ReasonMessageSection';
import RewardModal from '../Users/modals/RewardModal';
import  SupportService from "../../services/supportService"
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

const Ticket = ({ ticket }) => {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [user,setUser]=useState(defaultTicketData.user)
  const [loading,setLoading]=useState(defaultTicketData.user)
      useEffect(() => {
      const loadInitialData = async () => {
          setLoading(true);
          await new Promise(resolve => setTimeout(resolve, 500));
          try {
  
          const userData=await SupportService.getUser(ticket.id)
          console.log("user Data",userData)
          setUser(userData);
          
          } catch (error) {
          console.error('Error loading user:', error);
          } finally {
          setLoading(false);
          }
      };
  
      loadInitialData();
      }, []);


  const handleRewardClick = () => {
    setIsRewardModalOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    console.log('Status changed to:', newStatus);
  };
  if(loading) return <></>

  return (
    <div style={{ padding: '8px' }} className="space-y-4">
      {/* Ticket Header */}
      <TicketHeader 
        ticketId={ticket.id}
        onRewardClick={handleRewardClick}
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
          ticketNumber={ticket.number}
          createdOn={ticket.createdOn}
          resolvedOn={ticket.resolvedOn}
          startedBy={ticket.statedBy}
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
        user={ticket.user}
      />
    </div>
  );
};

export default Ticket;