// src/components/Users/modals/QRCodeModal.jsx
import React, { useState, useEffect } from 'react';
import BaseModal from '../common/BaseModal';
import tempQRImage from '../../../assets/images/svg8822.png';

const QRCodeModal = ({ isOpen, onClose, user }) => {
  const [qrImage, setQrImage] = useState(tempQRImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && user?.name) {
      setQrImage(tempQRImage);
    }
  }, [isOpen, user?.name]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="QR Code"
      width="500px"
      height="500px"
    >
      <div className="flex items-center justify-center h-full">
        <div className="border-2 border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 w-70 h-70">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading QR Code...</p>
            </div>
          ) : error ? (
            <div className="text-center p-4">
              <div className="text-red-500 text-4xl mb-2">⚠️</div>
              <p className="text-red-600 text-sm">{error}</p>
              <button 
                className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          ) : qrImage ? (
            <img 
              src={qrImage} 
              alt={`QR Code for ${user?.name || 'User'}`}
              className="w-60 h-60 rounded"
              onError={() => setError('Failed to load QR image')}
            />
          ) : (
            <div className="text-center p-4">
              <p className="text-gray-500 text-sm">Loading QR Code...</p>
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default QRCodeModal;