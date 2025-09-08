// src/components/CustomerSupport/TicketHeader.jsx
import { Gift } from 'lucide-react';
import ActionButton from '../Users/common/ActionButton';

const TicketHeader = ({ ticketNumber, onRewardClick,onBack }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <button className="flex items-center space-x-2 text-sm" onClick={onBack}>
        <span className="text-text">All Tickets</span>
        <span className="text-text">/</span>
        <span className="font-bold" style={{ color: '#05CBE7' }}>
          #{ticketNumber}
        </span>
      </button>
      
      <ActionButton
        variant="primary"
        icon={Gift}
        onClick={onRewardClick}
      >
        Reward
      </ActionButton>
    </div>
  );
};

export default TicketHeader;