export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
};

export const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  return date.toLocaleTimeString('en-GB', options).toUpperCase();
};

export const formatStatus = (isPending) => {
  return isPending ? 'Pending' : 'Active';
};

export const formatTicketStatus = (status) => {
  const map = {
    0: 'Unknown',
    1: 'Pending',
    2: 'InProgress',
    3: 'Resolved',
    4: 'Closed',
  };
  return map[status] || status;
};

export const formatTicketSubject = (type) => {
  const map = {
    0: 'Payment',
    1: 'QRCode',
    2: 'Bug',
    3: 'BankAccount',
    4: 'Account',
    5: 'Others',
  };
  return map[type] || type;
};
