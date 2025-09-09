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
    const [refreshTrigger, setRefreshTrigger] = useState(0); // For triggering data refresh

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
                // Load tickets based on current view
                const pageType = currentView === 'history' ? 'history' : 'main';
                const ticketsData = await SupportService.getTickets({ pageType });
                setAllTickets(ticketsData);
                
                // Load statistics (always show all tickets stats)
                const statsData = await SupportService.getStatistics();
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
    }, [currentView, refreshTrigger]); // Add refreshTrigger to dependencies

    // Apply filters
    useEffect(() => {
        if (allTickets.length === 0) return;

        let result = [...allTickets];

        // Apply status filter
        if (statusFilter !== 'all') {
            const statusMap = {
                'pending': 1,
                'inprogress': 2, 
                'resolved': 3
            };
            result = result.filter(ticket => ticket.status === statusMap[statusFilter]);
        }

        // Apply search filter
        if (debouncedSearchTerm) {
            const searchLower = debouncedSearchTerm.toLowerCase();
            result = result.filter(ticket => 
                ticket.ticketId.toLowerCase().includes(searchLower) ||
                ticket.username.toLowerCase().includes(searchLower) ||
                ticket.subject?.toLowerCase().includes(searchLower) ||
                getStatusLabel(ticket.status).toLowerCase().includes(searchLower)
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
            const statusNumber = getStatusNumber(advancedFilters.status);
            result = result.filter(ticket => ticket.status === statusNumber);
        }

        setFilteredTickets(result);
        setCurrentPage(1);
    }, [allTickets, statusFilter, debouncedSearchTerm, advancedFilters]);

    // Helper functions
    const getStatusLabel = (status) => {
        const map = {
            0: 'Unknown',
            1: 'Pending',
            2: 'In Progress',
            3: 'Resolved',
            4: 'Closed'
        };
        return map[status] || status;
    };

    const getStatusNumber = (statusLabel) => {
        const map = {
            'Unknown': 0,
            'Pending': 1,
            'In Progress': 2,
            'Resolved': 3,
            'Closed': 4
        };
        return map[statusLabel] || statusLabel;
    };

    // Function to refresh data after status change
    const refreshData = () => {
        setRefreshTrigger(prev => prev + 1);
    };

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
        try {
            const ticketData = await SupportService.getTicketDetails(id);
            setSelectedTicket(ticketData);
            setCurrentView('details');
        } catch (error) {
            console.error('Error loading ticket details:', error);
        }
    };

    const handleBackToList = () => {
        setCurrentView('list');
        setSelectedTicket(null);
        // Refresh data when coming back from ticket details
        refreshData();
    };

    const handleViewChange = (newView) => {
        setCurrentView(newView);
        // Reset selections when changing views
        setSelectedTickets([]);
        setSelectAll(false);
        setSelectCurrentPage(false);
        setCurrentPage(1);
        setSearchTerm('');
        setStatusFilter('all');
    };

    // Handle ticket status change callback
    const handleTicketStatusChange = (ticketId, newStatus) => {
        console.log(`Ticket ${ticketId} status changed to ${newStatus}`);
        // Refresh data after status change
        refreshData();
    };
    
    if (currentView === 'details') {
        return (
            <Ticket 
                ticket={selectedTicket} 
                onBack={handleBackToList}
                onStatusChange={handleTicketStatusChange}
            />
        );
    }

    return (
        <div className="relative">
            {/* Tabs Section */}
            <div className="bg-gray-50 h-[50px] mb-4 rounded-full px-2 flex items-center">
                <div className="flex gap-2 w-full sm:w-auto">
                    <ActionButton
                        variant={currentView === 'list' ? 'primary' : 'secondary'}
                        size="small"
                        onClick={() => handleViewChange('list')}
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
                        onClick={() => handleViewChange('history')}
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
                        onRefreshData={refreshData}
                    />
                </>
            )}

            {currentView === 'history' && (
            <HistoryView
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onRefreshData={refreshData}
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