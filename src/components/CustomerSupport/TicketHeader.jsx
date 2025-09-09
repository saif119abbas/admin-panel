// src/components/CustomerSupport/TicketHeader.jsx
import { Gift } from 'lucide-react';
import ActionButton from '../Users/common/ActionButton';

const TicketHeader = ({ ticketId, onRewardClick, onBack}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2 text-sm">
          <button onClick={onBack} className="text-text hover:text-gray-800 transition-colors">
            All Tickets
          </button>
        <span className="text-text">/</span>
        <span className="font-bold" style={{ color: '#05CBE7' }}>
          #{ticketId}
        </span>
      </div>
      
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