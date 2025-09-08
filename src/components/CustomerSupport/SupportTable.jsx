import { Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';
import LoadingSpinner from '../Users/common/LoadingSpinner';
import ConfirmationModal from '../ConfirmationModal'; // Adjust the path as needed
import SupportService from '../../services/supportService';
import { formatTicketStatus, formatTicketSubject, formatDate,formatTime } from '../../utils/formatters';


const SupportTable = ({
  tickets,
  currentPage,
  totalPages,
  onPageChange,
  selectedTickets,
  onSelectTicket,
  onTicketClick,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  loading = false
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return 'text-warning';
      case 2:
        return 'text-info';
      case 3:
        return 'text-success';
      default:
        return 'text-gray-600';
    }
  };



  const handleDeleteClick = (ticket, e) => {
    e.stopPropagation();
    setTicketToDelete(ticket);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!ticketToDelete) return;
    
    setIsDeleting(true);
    try {
      SupportService.deleteTicket(ticketToDelete.id)
      setIsDeleteModalOpen(false);
      setTicketToDelete(null);

    } catch (error) {
      console.error('Error deleting ticket:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setTicketToDelete(null);
  };

  const onClick = async (ticket) => {
    console.log("ticket data clicked")
    await onTicketClick(ticket.id)
  }

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      if (totalPages > 1) pages.push(totalPages);
    }

    return pages;
  };


  if (loading && tickets.length === 0) {
    return (
      <div className="bg-white p-8 flex justify-center rounded-lg">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200 rounded-t-lg rounded-b-lg">
            <tr>
              <th className="px-2 py-2 w-16 rounded-tl-lg rounded-bl-lg"></th>
              <th className="px-r-2 py-2 text-left text-md font-bold text-black">Ticket ID</th>
              <th className="px-4 py-2 text-left text-md font-bold text-black">User Name</th>
              <th className="px-4 py-2 text-left text-md font-bold text-black">Subject</th>
              <th className="px-4 py-2 text-left text-md font-bold text-black">Status</th>
              <th className="px-2 py-2 text-left text-md font-bold text-black">Date Submitted</th>
              <th className="px-2 py-2 text-left text-md font-bold text-black">Last Updated</th>
              <th className="px-2 py-2 text-left text-md font-bold text-black rounded-tr-lg rounded-br-lg">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                <td className="px-6 py-2 w-16">
                  <input
                    type="checkbox"
                    checked={selectedTickets.includes(ticket.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onSelectTicket(ticket.id, e.target.checked);
                    }}
                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                  />
                </td>
                <td className="px-0 py-4">
                  <span className="text-md text-text font-medium">{ticket.ticketId}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-md text-text">{ticket.username}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-md text-text max-w-xs truncate inline-block" title={ticket.subject}>
                    {formatTicketSubject(ticket.issueType)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-md ${getStatusColor(ticket.status)}`}>
                    {formatTicketStatus(ticket.status)}
                  </span>
                </td>
                <td className="px-2 py-4">
                  <span className="text-md text-text">{formatDate(ticket.createdAt) + ' ' + formatTime(ticket.createdAt)}</span>
                </td>
                <td className="px-2 py-4">
                  <span className="text-md text-text">{formatDate(ticket.lastUpdatedAt) + ' ' + formatTime(ticket.lastUpdatedAt)}</span>
                </td>
                <td className="px-2 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onClick(ticket)}
                      className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(ticket, e)}
                      className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                      title="Delete Ticket"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-start space-x-2">
            {generatePageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...' || loading}
                className={`w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors ${page === currentPage
                    ? 'bg-primary text-white'
                    : page === '...'
                      ? 'text-black cursor-default'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Ticket"
        message={`Are you sure you want to delete ticket ${ticketToDelete ? ticketToDelete.id : ''}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default SupportTable;