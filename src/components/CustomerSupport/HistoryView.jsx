// src/components/CustomerSupport/HistoryView.jsx
import { useState, useEffect } from 'react';
import LoadingSpinner from '../Users/common/LoadingSpinner';
import SupportFilters from './SupportFilters';
import HistoryFilterModal from './modals/HistoryFilterModal';
import SupportService from '../../services/supportService';
import { formatDate, formatTime, formatTicketSubject, formatTicketStatus } from '../../utils/formatters';

const HistoryView = ({ 
  currentPage, 
  onPageChange, 
  searchTerm, 
  onSearchChange,
  onRefreshData 
}) => {
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectCurrentPage, setSelectCurrentPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    ticketId: '',
    user: '',
    issueType: '',
    createdOn: '',
    resolvedOn: '',
    status: ''
  });

  const ticketsPerPage = 10;

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Load history data (resolved and closed tickets only)
  useEffect(() => {
    const loadHistoryData = async () => {
      setLoading(true);
      try {
        const historyTickets = await SupportService.getTickets({ pageType: 'history' });
        setHistoryData(historyTickets);
        setFilteredData(historyTickets);
      } catch (error) {
        console.error('Error loading history data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHistoryData();
  }, [onRefreshData]);

  // Apply filters when they change
  useEffect(() => {
    if (historyData.length === 0) return;

    let result = [...historyData];

    // Apply search filter with debounced term
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      result = result.filter(ticket =>
        ticket.ticketId.toLowerCase().includes(searchLower) ||
        ticket.username.toLowerCase().includes(searchLower) ||
        formatTicketSubject(ticket.issueType).toLowerCase().includes(searchLower) ||
        formatTicketStatus(ticket.status).toLowerCase().includes(searchLower)
      );
    }

    // Apply advanced filters
    if (advancedFilters.ticketId) {
      result = result.filter(ticket => 
        ticket.ticketId.toLowerCase().includes(advancedFilters.ticketId.toLowerCase())
      );
    }

    if (advancedFilters.user) {
      result = result.filter(ticket => 
        ticket.username.toLowerCase().includes(advancedFilters.user.toLowerCase())
      );
    }

    if (advancedFilters.issueType && advancedFilters.issueType !== 'All Issue Types') {
      result = result.filter(ticket => 
        formatTicketSubject(ticket.issueType) === advancedFilters.issueType
      );
    }

    if (advancedFilters.status && advancedFilters.status !== 'All Status') {
      const statusMap = {
        'Resolved': 3,
        'Closed': 4
      };
      const statusNumber = statusMap[advancedFilters.status];
      if (statusNumber) {
        result = result.filter(ticket => ticket.status === statusNumber);
      }
    }

    setFilteredData(result);
    onPageChange(1); // Reset to first page when filters change
  }, [historyData, debouncedSearchTerm, advancedFilters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + ticketsPerPage);

  // Handlers for selection
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectCurrentPage(false);
    setSelectedTickets(checked ? filteredData.map(t => t.id) : []);
  };

  const handleSelectCurrentPage = (checked) => {
    setSelectCurrentPage(checked);
    setSelectAll(false);

    if (checked) {
      setSelectedTickets(prev => [...new Set([...prev, ...paginatedData.map(t => t.id)])]);
    } else {
      setSelectedTickets(prev => prev.filter(id => !paginatedData.map(t => t.id).includes(id)));
    }
  };

  const handleSelectTicket = (ticketId, checked) => {
    if (checked) {
      setSelectedTickets(prev => [...prev, ticketId]);
    } else {
      setSelectedTickets(prev => prev.filter(id => id !== ticketId));
      setSelectAll(false);
      setSelectCurrentPage(false);
    }
  };

  const handleApplyFilters = (filters) => {
    setAdvancedFilters(filters);
  };

  // Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case 3: // Resolved
        return 'text-green-600 font-medium';
      case 4: // Closed
        return 'text-danger font-medium';
      default: 
        return 'text-gray-500';
    }
  };

  // Pagination numbers
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      if (totalPages > 1) pages.push(totalPages);
    }
    return pages;
  };

  if (loading && historyData.length === 0) {
    return (
      <div className="bg-white p-8 flex justify-center rounded-lg">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg">
      {/* Filters */}
      <SupportFilters
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectAll={selectAll}
        selectCurrentPage={selectCurrentPage}
        onSelectAll={handleSelectAll}
        onSelectCurrentPage={handleSelectCurrentPage}
        onOpenFilter={() => setIsFilterModalOpen(true)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 w-12"></th>
              <th className="px-4 py-3 text-left text-md font-bold text-black">Ticket ID</th>
              <th className="px-4 py-3 text-left text-md font-bold text-black">User Name</th>
              <th className="px-4 py-3 text-left text-md font-bold text-black">Issue Type</th>
              <th className="px-4 py-3 text-left text-md font-bold text-black">Created On</th>
              <th className="px-4 py-3 text-left text-md font-bold text-black">Last Updated</th>
              <th className="px-4 py-3 text-left text-md font-bold text-black">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-600">
                  {loading ? 'Loading...' : 'No history tickets found'}
                </td>
              </tr>
            ) : (
              paginatedData.map((ticket, index) => (
                <tr key={`${ticket.id}-${index}`} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedTickets.includes(ticket.id)}
                      onChange={(e) => handleSelectTicket(ticket.id, e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 focus:ring-2"
                    />
                  </td>
                  <td className="px-4 py-3 text-md font-medium text-text">{ticket.ticketId}</td>
                  <td className="px-4 py-3 text-md text-text">{ticket.username}</td>
                  <td className="px-4 py-3 text-md text-text">{formatTicketSubject(ticket.issueType)}</td>
                  <td className="px-4 py-3 text-md text-text">
                    {formatDate(ticket.createdAt)} {formatTime(ticket.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-md text-text">
                    {formatDate(ticket.lastUpdatedAt)} {formatTime(ticket.lastUpdatedAt)}
                  </td>
                  <td className={`px-4 py-3 text-md ${getStatusColor(ticket.status)}`}>
                    {formatTicketStatus(ticket.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            {generatePageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...' || loading}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors ${
                  page === currentPage
                    ? 'bg-primary text-white'
                    : page === '...'
                    ? 'cursor-default text-gray-600'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* History Filter Modal */}
      <HistoryFilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={advancedFilters}
      />
    </div>
  );
};

export default HistoryView;