import React from 'react';
import UserHeader from './Head';
import TicketDetails from './TicketDetails';
export default function Ticket() {
      const handleBack = () => {
    console.log('Navigate back to All Tickets');
  };
  return (
   <div className="min-h-screen ">
        <UserHeader onBack={handleBack} />
        <TicketDetails />
    </div>
  );
}