// src/components/Users/modals/QRCodeModal.jsx
import React, { useState, useEffect, useCallback } from 'react';
import BaseModal from '../common/BaseModal';
import tempQRImage from '../../../assets/images/svg8822.png';
import tipReceiverService from '../../../services/tipReceiverService';

const QRCodeModal = ({ isOpen, onClose, user }) => {
  const [qrImage, setQrImage] = useState(tempQRImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQRCode = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);
    setQrImage(null);

    try {
      const response = await tipReceiverService.getTipReceiverQRCode(user.id);
      if (response && response.qrCodeBase64) {
        setQrImage(`data:image/png;base64,${response.qrCodeBase64}`);
      } else {
        setError('QR code not available.');
        setQrImage(tempQRImage);
      }
    } catch (err) {
      console.error('Error fetching QR code:', err);
      setError('Failed to load QR code.');
      setQrImage(tempQRImage);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isOpen) {
      fetchQRCode();
    }
  }, [isOpen, fetchQRCode]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="QR Code"
      width="450px"
      height="auto"
    >
      <div className="flex flex-col items-center justify-center p-6">
        {loading ? (
          <div className="w-60 h-60 flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center p-4">
            <div className="text-red-500 text-4xl mb-2">⚠️</div>
            <p className="text-red-600 text-sm">{error}</p>
            <button 
              onClick={fetchQRCode}
              className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-primary"
            >
              Retry
            </button>
          </div>
        ) : qrImage ? (
          <img 
            src={qrImage} 
            alt={`QR Code for ${user?.firstName + ' ' + user?.surName || 'User'}`}
            className="rounded"
            style={{ width: '100%', height: '100%' }}
            onError={() => {
              setError('Failed to load QR image');
              setQrImage(tempQRImage);
            }}
          />
        ) : null}
      </div>
    </BaseModal>
  );
};

export default QRCodeModal;