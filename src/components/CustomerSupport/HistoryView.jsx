// src/components/CustomerSupport/HistoryView.jsx
import { useState, useEffect } from 'react';
import LoadingSpinner from '../Users/common/LoadingSpinner';
import SupportFilters from './SupportFilters';
import HistoryFilterModal from './modals/HistoryFilterModal';

const HistoryView = () => {
  // Mock history data
  const mockHistoryData = [
    {
      id: '#TICK-00156',
      userName: 'Marvin McKinney',
      issueType: 'Tip Issue',
      createdOn: '25 Jul 2025, 4:00 PM',
      resolvedOn: '26 Jul 2025, 1:00 PM',
      status: 'Resolved'
    },
    {
      id: '#TICK-00157',
      userName: 'Leslie Alexander',
      issueType: 'Bug Report',
      createdOn: '24 Jul 2025, 11:30 AM',
      resolvedOn: '24 Jul 2025, 2:30 PM',
      status: 'Resolved'
    },
    {
      id: '#TICK-00155',
      userName: 'Ronald Richards',
      issueType: 'Tip Issue',
      createdOn: '25 Jul 2025, 4:00 PM',
      resolvedOn: '26 Jul 2025, 1:00 PM',
      status: 'Closed'
    },
    {
      id: '#TICK-00158',
      userName: 'Jane Cooper',
      issueType: 'Account Issue',
      createdOn: '23 Jul 2025, 9:15 AM',
      resolvedOn: '23 Jul 2025, 3:45 PM',
      status: 'Resolved'
    },
    {
      id: '#TICK-00159',
      userName: 'Devon Lane',
      issueType: 'Payment Issue',
      createdOn: '22 Jul 2025, 2:30 PM',
      resolvedOn: '23 Jul 2025, 10:00 AM',
      status: 'Closed'
    },
    {
      id: '#TICK-00160',
      userName: 'Robert Fox',
      issueType: 'Technical Issue',
      createdOn: '21 Jul 2025, 1:00 PM',
      resolvedOn: '22 Jul 2025, 11:30 AM',
      status: 'Resolved'
    },
    {
      id: '#TICK-00161',
      userName: 'Cody Fisher',
      issueType: 'Bug Report',
      createdOn: '20 Jul 2025, 4:45 PM',
      resolvedOn: '21 Jul 2025, 2:15 PM',
      status: 'Closed'
    },
    {
      id: '#TICK-00162',
      userName: 'Savannah Nguyen',
      issueType: 'Tip Issue',
      createdOn: '19 Jul 2025, 11:20 AM',
      resolvedOn: '20 Jul 2025, 9:00 AM',
      status: 'Resolved'
    },
    {
      id: '#TICK-00163',
      userName: 'Jacob Jones',
      issueType: 'Account Issue',
      createdOn: '18 Jul 2025, 3:30 PM',
      resolvedOn: '19 Jul 2025, 1:45 PM',
      status: 'Closed'
    },
    {
      id: '#TICK-00164',
      userName: 'Kristin Watson',
      issueType: 'Payment Issue',
      createdOn: '17 Jul 2025, 10:15 AM',
      resolvedOn: '18 Jul 2025, 8:30 AM',
      status: 'Resolved'
    },
    {
      id: '#TICK-00165',
      userName: 'Albert Flores',
      issueType: 'Technical Issue',
      createdOn: '16 Jul 2025, 2:00 PM',
      resolvedOn: '17 Jul 2025, 12:00 PM',
      status: 'Closed'
    },
    {
      id: '#TICK-00166',
      userName: 'Wade Warren',
      issueType: 'Bug Report',
      createdOn: '15 Jul 2025, 9:45 AM',
      resolvedOn: '16 Jul 2025, 4:20 PM',
      status: 'Resolved'
    },
    {
      id: '#TICK-00167',
      userName: 'Guy Hawkins',
      issueType: 'Tip Issue',
      createdOn: '14 Jul 2025, 1:30 PM',
      resolvedOn: '15 Jul 2025, 11:15 AM',
      status: 'Closed'
    },
    {
      id: '#TICK-00168',
      userName: 'Dianne Russell',
      issueType: 'Account Issue',
      createdOn: '13 Jul 2025, 4:15 PM',
      resolvedOn: '14 Jul 2025, 2:45 PM',
      status: 'Resolved'
    },
    {
      id: '#TICK-00169',
      userName: 'Courtney Henry',
      issueType: 'Payment Issue',
      createdOn: '12 Jul 2025, 11:00 AM',
      resolvedOn: '13 Jul 2025, 9:30 AM',
      status: 'Closed'
    }
  ];

  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectCurrentPage, setSelectCurrentPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setHistoryData(mockHistoryData);
      setFilteredData(mockHistoryData);
      setLoading(false);
    };
    loadData();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (historyData.length === 0) return;

    let result = [...historyData];

    // Apply search filter with debounced term
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      result = result.filter(ticket =>
        ticket.id.toLowerCase().includes(searchLower) ||
        ticket.userName.toLowerCase().includes(searchLower) ||
        ticket.issueType.toLowerCase().includes(searchLower) ||
        ticket.status.toLowerCase().includes(searchLower)
      );
    }

    // Apply advanced filters
    if (advancedFilters.ticketId) {
      result = result.filter(ticket => 
        ticket.id.toLowerCase().includes(advancedFilters.ticketId.toLowerCase())
      );
    }

    if (advancedFilters.user) {
      result = result.filter(ticket => 
        ticket.userName.toLowerCase().includes(advancedFilters.user.toLowerCase())
      );
    }

    if (advancedFilters.issueType && advancedFilters.issueType !== 'All Issue Types') {
      result = result.filter(ticket => ticket.issueType === advancedFilters.issueType);
    }

    if (advancedFilters.status && advancedFilters.status !== 'All Status') {
      result = result.filter(ticket => ticket.status === advancedFilters.status);
    }

    // Apply date filters (simplified for demo)
    if (advancedFilters.createdOn) {
      // This would need proper date parsing in a real application
      result = result.filter(ticket => ticket.createdOn.includes('2025'));
    }

    if (advancedFilters.resolvedOn) {
      // This would need proper date parsing in a real application
      result = result.filter(ticket => ticket.resolvedOn.includes('2025'));
    }

    setFilteredData(result);
    setCurrentPage(1);
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
      // Add only current page tickets to selection
      setSelectedTickets(prev => [...new Set([...prev, ...paginatedData.map(t => t.id)])]);
    } else {
      // Remove current page tickets from selection
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

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Reset only selectCurrentPage (Select All remains if active)
    setSelectCurrentPage(false);
  };

  // Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'text-green-600 font-medium';
      case 'Closed': return 'text-gray-500 font-medium';
      default: return 'text-gray-500';
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
        onSearchChange={setSearchTerm}
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
              <th className="px-4 py-3 text-left text-md font-bold text-black">Resolved On</th>
              <th className="px-4 py-3 text-left text-md font-bold text-black">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((ticket, index) => (
              <tr key={`${ticket.id}-${index}`} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedTickets.includes(ticket.id)}
                    onChange={(e) => handleSelectTicket(ticket.id, e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 focus:ring-2"
                  />
                </td>
                <td className="px-4 py-3 text-md font-medium text-text">{ticket.id}</td>
                <td className="px-4 py-3 text-md text-text">{ticket.userName}</td>
                <td className="px-4 py-3 text-md text-text">{ticket.issueType}</td>
                <td className="px-4 py-3 text-md text-text">{ticket.createdOn}</td>
                <td className="px-4 py-3 text-md text-text">{ticket.resolvedOn}</td>
                <td className={`px-4 py-3 text-md ${getStatusColor(ticket.status)}`}>{ticket.status}</td>
              </tr>
            ))}
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
                onClick={() => typeof page === 'number' && handlePageChange(page)}
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