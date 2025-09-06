// src/components/CustomerSupport/TicketUserCard.jsx
const TicketUserCard = ({ 
  userImage, 
  userName, 
  location, 
  phoneNumber, 
  status 
}) => {
  const getStatusStyle = (status) => {
    if (status === 'Active') {
      return {
        backgroundColor: '#E8F5E8',
        color: '#2E7D32'
      };
    } else {
      return {
        backgroundColor: '#FFF3CD',
        color: '#856404'
      };
    }
  };

  return (
    <div 
      className="bg-dark_bg rounded-2xl p-4 relative overflow-hidden min-h-[200px] sm:min-h-[172px]"
      style={{ borderRadius: '16px' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full opacity-5"></div>
        <div className="absolute bottom-4 right-10 md:right-20 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full opacity-5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* User Image */}
        <div 
          className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-[110px] md:h-[110px] lg:w-[137px] lg:h-[137px] overflow-hidden"
          style={{ 
            borderRadius: '8px',
            padding: '0' 
          }}
        >
          {userImage ? (
            <img
              src={userImage}
              alt={userName}
              className="w-full h-full object-cover"
              style={{ borderRadius: '8px' }}
            />
          ) : (
            <div 
              className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
              style={{ borderRadius: '8px' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                alt={userName}
                className="w-full h-full object-cover"
                style={{ borderRadius: '8px' }}
              />
            </div>
          )}
        </div>

        {/* User Details */}
        <div className="text-white flex-1">
          <h4 className="text-lg sm:text-xl md:text-2xl font-bold truncate">
            {userName}
          </h4>
          <p className="text-white text-sm md:text-base" style={{ marginTop: '8px' }}>
            {location}
          </p>
          <p className="text-white text-sm md:text-base" style={{ marginTop: '4px' }}>
            {phoneNumber}
          </p>
          <span 
            className="inline-flex items-center px-3 py-1 text-white text-sm font-medium w-fit"
            style={{
              backgroundColor: '#5BC039',
              borderRadius: '48px',
              marginTop: '8px',
              display: 'inline-flex'
            }}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketUserCard;