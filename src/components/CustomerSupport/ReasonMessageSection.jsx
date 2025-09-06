// src/components/CustomerSupport/ReasonMessageSection.jsx
import React from 'react';

const ReasonMessageSection = ({ 
  reason = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
}) => {
  return (
    <div 
      className="w-full bg-white rounded-2xl p-6"
      style={{ 
        border: '1px solid #F0F0F0',
        borderRadius: '16px'
      }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Reason & Message
      </h3>
      
      <div className="text-gray-700 text-sm leading-relaxed">
        {reason}
      </div>
    </div>
  );
};

export default ReasonMessageSection;