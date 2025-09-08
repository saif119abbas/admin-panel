// src/screens/CustomerSupport.jsx
import { useState, useEffect } from 'react';
import SupportStats from '../components/CustomerSupport/SupportStats';
import SupportFilters from '../components/CustomerSupport/SupportFilters';
import SupportTable from '../components/CustomerSupport/SupportTable';
import FilterModal from '../components/CustomerSupport/modals/FilterModal';
import Ticket from '../components/CustomerSupport/Ticket';
import HistoryView from '../components/CustomerSupport/HistoryView';
import ActionButton from '../components/Users/common/ActionButton';
import SupportService from '../services/supportService';
import '../App.css';
  /*  const mockTickets = [
    {
        id: '#TICK-0023',
        userName: 'Ronald Richards',
        subject: 'App crashes on login',
        status: 'Pending',
        dateSubmitted: '28 July 2025',
        lastUpdated: '29 July 2025',
        priority: 'High',
        category: 'Technical'
    },
    {
        id: '#TICK-0024',
        userName: 'Jane Cooper',
        subject: "Can't reset password",
        status: 'In-progress',
        dateSubmitted: '28 July 2025',
        lastUpdated: '29 July 2025',
        priority: 'Medium',
        category: 'Account'
    },
    {
        id: '#TICK-0025',
        userName: 'Esther Howard',
        subject: 'Bug in payment flow',
        status: 'Pending',
        dateSubmitted: '28 July 2025',
        lastUpdated: '29 July 2022',
        priority: 'Critical',
        category: 'Payment'
    },
    {
        id: '#TICK-0026',
        userName: 'Marvin McKinney',
        subject: 'Tip not received after transaction',
        status: 'Resolved',
        dateSubmitted: '28 July 2025',
        lastUpdated: '29 July 2025',
        priority: 'Low',
        category: 'Financial'
    },
    {
        id: '#TICK-0027',
        userName: 'Leslie Alexander',
        subject: 'Issue with linking my payment method',
        status: 'Resolved',
        dateSubmitted: '28 July 2025',
        lastUpdated: '29 July 2025',
        priority: 'Medium',
        category: 'Payment'
    },
    {
        id: '#TICK-0028',
        userName: 'Cameron Williamson',
        subject: "Can't withdraw tips to my bank account",
        status: 'In-progress',
        dateSubmitted: '28 July 2025',
        lastUpdated: '29 July 2025',
        priority: 'High',
        category: 'Financial'
    },
    {
        id: '#TICK-0029',
        userName: 'Jerome Bell',
        subject: 'Received wrong tip amount',
        status: 'Pending',
        dateSubmitted: '28 July 2025',
        lastUpdated: '29 July 2025',
        priority: 'Medium',
        category: 'Financial'
    },
    {
        id: '#TICK-0030',
        userName: 'Ralph Edwards',
        subject: 'App crashes after submitting a tip',
        status: 'Resolved',
        dateSubmitted: '28 July 2025',
        lastUpdated: '29 July 2025',
        priority: 'High',
        category: 'Technical'
    },
    {
        id: '#TICK-0031',
        userName: 'Eleanor Pena',
        subject: 'Inaccurate tip history showing',
        status: 'In-progress',
        dateSubmitted: '28 July 2025',
        lastUpdated: '29 July 2021',
        priority: 'Low',
        category: 'Account'
    },
    {
        id: '#TICK-0032',
        userName: 'Brooklyn Simmons',
        subject: 'Tip receipt not generated',
        status: 'Pending',
        dateSubmitted: '28 July 2025',
        lastUpdated: '29 July 2025',
        priority: 'Medium',
        category: 'Technical'
    },
    {
        id: '#TICK-0033',
        userName: 'Kathryn Murphy',
        subject: "Can't update profile photo",
        status: 'Resolved',
        dateSubmitted: '28 July 2025',
        lastUpdated: '29 July 2025',
        priority: 'Low',
        category: 'Account'
    },
    {
        id: '#TICK-0034',
        userName: 'Albert Flores',
        subject: 'User reported abusive message',
        status: 'In-progress',
        dateSubmitted: '28 July 2025',
        lastUpdated: '29 July 2022',
        priority: 'Critical',
        category: 'Safety'
    }
    ];*/

const CustomerSupport = () => {

    const [allTickets, setAllTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectCurrentPage, setSelectCurrentPage] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState({
    priority: '',
    category: '',
    dateSubmitted: '',
    status: ''
    });
    const [currentView, setCurrentView] = useState('list');
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Debounce search term
    useEffect(() => {
    const timerId = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
        clearTimeout(timerId);
    };
    }, [searchTerm]);

    // Load initial data
    useEffect(() => {
    const loadInitialData = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        try {

        const ticketsData=await SupportService.getTickets({})
        setAllTickets(ticketsData);
        const statsData=await SupportService.getStatistics()
        setStats({
            total: statsData.totalNumberOfTickets,
            pending: statsData.totalNumberOfPendingTickets,
            inProgress: statsData.totalNumberOfInProgressTickets,
            resolved: statsData.totalNumberOfResolvedTickets
        });
        
        setFilteredTickets(ticketsData);
        
        } catch (error) {
        console.error('Error loading tickets:', error);
        } finally {
        setLoading(false);
        }
    };

    loadInitialData();
    }, []);

    useEffect(() => {
    if (allTickets.length === 0) return;

    let result = [...allTickets];
    if (statusFilter !== 'all') {
        const statusMap = {
        'pending': 'Pending',
        'inprogress': 'In-progress',
        'resolved': 'Resolved'
        };
        result = result.filter(ticket => ticket.status === statusMap[statusFilter]);
    }

    // Apply search filter
    if (debouncedSearchTerm) {
        const searchLower = debouncedSearchTerm.toLowerCase();
        result = result.filter(ticket => 
        ticket.ticketId.toLowerCase().includes(searchLower) ||
        ticket.userName.toLowerCase().includes(searchLower) ||
        ticket.subject.toLowerCase().includes(searchLower) ||
        ticket.status.toLowerCase().includes(searchLower) ||
        ticket.priority.toLowerCase().includes(searchLower) ||
        ticket.category.toLowerCase().includes(searchLower)
        );
    }

    // Apply advanced filters
    if (advancedFilters.priority && advancedFilters.priority !== 'All Priorities') {
        result = result.filter(ticket => ticket.priority === advancedFilters.priority);
    }

    if (advancedFilters.category && advancedFilters.category !== 'All Categories') {
        result = result.filter(ticket => ticket.category === advancedFilters.category);
    }

    if (advancedFilters.status && advancedFilters.status !== 'All Status') {
        result = result.filter(ticket => ticket.status === advancedFilters.status);
    }

    setFilteredTickets(result);
    setCurrentPage(1);
    }, [allTickets, statusFilter, debouncedSearchTerm, advancedFilters]);

    // Pagination
    const ticketsPerPage = 12;
    const totalFilteredPages = Math.ceil(filteredTickets.length / ticketsPerPage);
    const startIndex = (currentPage - 1) * ticketsPerPage;
    const paginatedTickets = filteredTickets.slice(startIndex, startIndex + ticketsPerPage);

    // Handle selection functions
    const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectCurrentPage(false);
    if (checked) {
        setSelectedTickets(filteredTickets.map(ticket => ticket.id));
    } else {
        setSelectedTickets([]);
    }
    };

    const handleSelectCurrentPage = (checked) => {
    setSelectCurrentPage(checked);
    setSelectAll(false);
    if (checked) {
        setSelectedTickets(paginatedTickets.map(ticket => ticket.id));
    } else {
        setSelectedTickets([]);
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

    const handleTicketClick = async (id) => {
    const ticketData=await SupportService.getTicketDetails(id)
    setSelectedTicket(ticketData);
    setCurrentView('details');
    };

    console.log("currentView",currentView)

    const handleBackToList = () => {
    setCurrentView('list');
    setSelectedTicket(null);
    };  
    if (currentView === 'details') {
        return <Ticket ticket={selectedTicket} onBack={handleBackToList} />;
    }

    return (
    <div className="relative">
        {/* Tabs Section */}
        <div className="bg-gray-50 h-[50px] mb-4 rounded-full px-2 flex items-center">
        <div className="flex gap-2 w-full sm:w-auto">
            <ActionButton
            variant={currentView === 'list' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setCurrentView('list')}
            className={`h-[42px] flex-1 sm:w-[101px] text-xs sm:text-sm rounded-full ${
                currentView === 'list'
                ? ''
                : '!bg-transparent !text-gray-700 !border-0 hover:!bg-gray-100'
            }`}
            >
            All Tickets
            </ActionButton>
            <ActionButton
            variant={currentView === 'history' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setCurrentView('history')}
            className={`h-[42px] flex-1 sm:w-[101px] text-xs sm:text-sm rounded-full ${
                currentView === 'history'
                ? ''
                : '!bg-transparent !text-gray-700 !border-0 hover:!bg-gray-100'
            }`}
            >
            History
            </ActionButton>
        </div>
        </div>

        {currentView === 'list' && (
        <>
            {/* Stats Cards */}
            <SupportStats stats={stats} loading={loading} />

            {/* Filters */}
            <SupportFilters 
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectAll={selectAll}
                selectCurrentPage={selectCurrentPage}
                onSelectAll={handleSelectAll}
                onSelectCurrentPage={handleSelectCurrentPage}
                onOpenFilter={() => setIsFilterModalOpen(true)}
            />

            {/* Support Table */}
            <SupportTable 
                tickets={paginatedTickets}
                currentPage={currentPage}
                totalPages={totalFilteredPages}
                onPageChange={setCurrentPage}
                selectedTickets={selectedTickets}
                onSelectTicket={handleSelectTicket}
                onTicketClick={handleTicketClick}
                loading={loading}
            />
        </>
        )}

        {currentView === 'history' && (
        <HistoryView
            tickets={paginatedTickets} 
            currentPage={currentPage}
            totalPages={totalFilteredPages}
            onPageChange={setCurrentPage}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
        />
        )}

        <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={advancedFilters}
        />
    </div>
    );
};

export default CustomerSupport; 