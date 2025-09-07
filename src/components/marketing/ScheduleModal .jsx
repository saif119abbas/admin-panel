import { useState } from 'react';
import BaseModal from '../Users/common/BaseModal';
import MarketingServices from '../../services/marketingServices';

const ScheduleModal = ({ isOpen, onClose, template,users,content }) => {
  // Get current date and time
  const now = new Date();
  const defaultDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const defaultTime = now.toTimeString().slice(0, 5); // HH:MM

  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(defaultTime);

  const handleSubmit =async () => {
    if (date && time) {
 
          
          const newTemplate = {
            ...template,
            content
          };
          const data ={
            template:newTemplate,
            users,
            schedule:{
                date,
                time
            }
          }
          
          const res = await MarketingServices.scheduleNotification(data);
          console.log(res);
      onClose();
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule"
      width="400px"
      footer={
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Submit
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default ScheduleModal;
