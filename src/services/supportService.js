import apiService from "../api/apiService";

// Mock data for testing
const mockTickets = [
  {
    id: 1,
    ticketId: "TCK-00001",
    username: "John Doe",
    userId: 101,
    issueType: 0, // Payment
    status: 1, // Pending
    subject: "Payment Issue with Credit Card",
    createdAt: "2025-01-15T10:30:00Z",
    lastUpdatedAt: "2025-01-15T10:30:00Z",
    reasonMessage: "Unable to process payment with my credit card. Transaction keeps failing.",
    statedBy: "John Doe"
  },
  {
    id: 2,
    ticketId: "TCK-00002",
    username: "Sarah Smith",
    userId: 102,
    issueType: 1, // QRCode
    status: 2, // InProgress
    subject: "QR Code Not Scanning",
    createdAt: "2025-01-14T14:20:00Z",
    lastUpdatedAt: "2025-01-15T09:15:00Z",
    reasonMessage: "The QR code generated for my business is not scanning properly on customer devices.",
    statedBy: "Sarah Smith"
  },
  {
    id: 3,
    ticketId: "TCK-00003",
    username: "Mike Johnson",
    userId: 103,
    issueType: 2, // Bug
    status: 3, // Resolved
    subject: "App Crashes on Login",
    createdAt: "2025-01-13T16:45:00Z",
    lastUpdatedAt: "2025-01-14T11:30:00Z",
    reasonMessage: "The mobile app crashes every time I try to log in with my credentials.",
    statedBy: "Mike Johnson"
  },
  {
    id: 4,
    ticketId: "TCK-00004",
    username: "Emily Davis",
    userId: 104,
    issueType: 3, // BankAccount
    status: 4, // Closed
    subject: "Bank Account Verification Failed",
    createdAt: "2025-01-12T11:15:00Z",
    lastUpdatedAt: "2025-01-13T10:20:00Z",
    reasonMessage: "Unable to verify my bank account for tip withdrawals. Keep getting error messages.",
    statedBy: "Emily Davis"
  },
  {
    id: 5,
    ticketId: "TCK-00005",
    username: "David Wilson",
    userId: 105,
    issueType: 4, // Account
    status: 1, // Pending
    subject: "Account Suspended Without Notice",
    createdAt: "2025-01-11T13:25:00Z",
    lastUpdatedAt: "2025-01-11T13:25:00Z",
    reasonMessage: "My account has been suspended and I haven't received any notification about the reason.",
    statedBy: "David Wilson"
  },
  {
    id: 6,
    ticketId: "TCK-00006",
    username: "Lisa Brown",
    userId: 106,
    issueType: 5, // Others
    status: 2, // InProgress
    subject: "Profile Information Update Issue",
    createdAt: "2025-01-10T09:40:00Z",
    lastUpdatedAt: "2025-01-11T15:10:00Z",
    reasonMessage: "Cannot update my profile information. Changes are not being saved.",
    statedBy: "Lisa Brown"
  },
  {
    id: 7,
    ticketId: "TCK-00007",
    username: "Robert Taylor",
    userId: 107,
    issueType: 0, // Payment
    status: 3, // Resolved
    subject: "Refund Request Processing",
    createdAt: "2025-01-09T12:00:00Z",
    lastUpdatedAt: "2025-01-10T14:30:00Z",
    reasonMessage: "Requested a refund for duplicate charge but haven't received confirmation.",
    statedBy: "Robert Taylor"
  },
  {
    id: 8,
    ticketId: "TCK-00008",
    username: "Jennifer White",
    userId: 108,
    issueType: 1, // QRCode
    status: 4, // Closed
    subject: "QR Code Design Customization",
    createdAt: "2025-01-08T15:30:00Z",
    lastUpdatedAt: "2025-01-09T10:45:00Z",
    reasonMessage: "Want to customize the design of my QR code for branding purposes.",
    statedBy: "Jennifer White"
  }
];

const mockUsers = [
  {
    id: 101,
    name: "John Doe",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    countryId: "New York, USA",
    mobileNumber: "+1 234 567 8901",
    status: "Active"
  },
  {
    id: 102,
    name: "Sarah Smith",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    countryId: "Los Angeles, USA",
    mobileNumber: "+1 234 567 8902",
    status: "Active"
  },
  {
    id: 103,
    name: "Mike Johnson",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    countryId: "Chicago, USA",
    mobileNumber: "+1 234 567 8903",
    status: "Active"
  },
  {
    id: 104,
    name: "Emily Davis",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    countryId: "Houston, USA",
    mobileNumber: "+1 234 567 8904",
    status: "Pending"
  },
  {
    id: 105,
    name: "David Wilson",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    countryId: "Phoenix, USA",
    mobileNumber: "+1 234 567 8905",
    status: "Active"
  },
  {
    id: 106,
    name: "Lisa Brown",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    countryId: "Philadelphia, USA",
    mobileNumber: "+1 234 567 8906",
    status: "Active"
  },
  {
    id: 107,
    name: "Robert Taylor",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    countryId: "San Antonio, USA",
    mobileNumber: "+1 234 567 8907",
    status: "Active"
  },
  {
    id: 108,
    name: "Jennifer White",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    countryId: "San Diego, USA",
    mobileNumber: "+1 234 567 8908",
    status: "Pending"
  }
];

class SupportService {
  // Original functions commented for later restoration
  /*
  async getTickets(filters) {
    try {
      const response = await apiService.get("/SupportIssue/0");
      return response.data;
    } catch (error) {
      console.error("Error fetching tip receivers:", error);
      return [];
    }
  }

  async getUser(id) {
    try {
      const response = await apiService.get(`/TipReceiver/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tip receiver by ID:", error);
      return null;
    }
  }

  async getStatistics() {
    try {
      const response = await apiService.get("/SupportIssue/Statistics");
      return response.data;
    } catch (error) {
      console.error("Error fetching statistics:", error);
      return null;
    }
  }

  async getTicketDetails(id) {
    try {
      const response = await apiService.get(`/SupportIssue/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      return null;
    }
  }

  async updateTikcet(id, status) {
    try {
      // status should be number
      const response = await apiService.put(`/SupportIssue/${id}`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating ticket status:", error);
      return false;
    }
  }
  */

  // Mock functions for testing
  async getTickets(filters = {}) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let tickets = [...mockTickets];
      
      // Filter based on page type - main support page shows pending, in-progress, resolved
      // History page shows resolved and closed
      if (filters.pageType === 'history') {
        tickets = tickets.filter(ticket => ticket.status === 3 || ticket.status === 4); // Resolved or Closed
      } else {
        tickets = tickets.filter(ticket => ticket.status === 1 || ticket.status === 2 || ticket.status === 3); // Pending, InProgress, Resolved
      }
      
      return tickets;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return [];
    }
  }

  async getUser(id) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const user = mockUsers.find(user => user.id === id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  }

  async getStatistics() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const total = mockTickets.length;
      const pending = mockTickets.filter(t => t.status === 1).length;
      const inProgress = mockTickets.filter(t => t.status === 2).length;
      const resolved = mockTickets.filter(t => t.status === 3).length;
      const closed = mockTickets.filter(t => t.status === 4).length;
      
      return {
        totalNumberOfTickets: total,
        totalNumberOfPendingTickets: pending,
        totalNumberOfInProgressTickets: inProgress,
        totalNumberOfResolvedTickets: resolved,
        totalNumberOfClosedTickets: closed
      };
    } catch (error) {
      console.error("Error fetching statistics:", error);
      return {
        totalNumberOfTickets: 0,
        totalNumberOfPendingTickets: 0,
        totalNumberOfInProgressTickets: 0,
        totalNumberOfResolvedTickets: 0,
        totalNumberOfClosedTickets: 0
      };
    }
  }

  async getTicketDetails(id) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const ticket = mockTickets.find(ticket => ticket.id === id);
      if (!ticket) {
        throw new Error(`Ticket with ID ${id} not found`);
      }
      return ticket;
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      return null;
    }
  }

  async updateTicket(id, newStatus) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const ticketIndex = mockTickets.findIndex(ticket => ticket.id === id);
      if (ticketIndex === -1) {
        throw new Error(`Ticket with ID ${id} not found`);
      }
      
      // Convert status string to number if needed
      let statusNumber = newStatus;
      if (typeof newStatus === 'string') {
        const statusMap = {
          'Pending': 1,
          'In Progress': 2,
          'Resolved': 3,
          'Closed': 4
        };
        statusNumber = statusMap[newStatus] || newStatus;
      }
      
      // Update the ticket
      mockTickets[ticketIndex] = {
        ...mockTickets[ticketIndex],
        status: statusNumber,
        lastUpdatedAt: new Date().toISOString()
      };
      
      return {
        success: true,
        data: mockTickets[ticketIndex]
      };
    } catch (error) {
      console.error("Error updating ticket status:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteTicket(id) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const ticketIndex = mockTickets.findIndex(ticket => ticket.id === id);
      if (ticketIndex === -1) {
        throw new Error(`Ticket with ID ${id} not found`);
      }
      
      // Remove ticket from mock data
      mockTickets.splice(ticketIndex, 1);
      
      return {
        success: true,
        message: 'Ticket deleted successfully'
      };
    } catch (error) {
      console.error("Error deleting ticket:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Method to get current mock data (for debugging)
  getMockData() {
    return {
      tickets: mockTickets,
      users: mockUsers
    };
  }

  // Method to reset mock data to initial state
  resetMockData() {
    // This would reset the data to initial state if needed
    console.log("Mock data reset functionality can be implemented here");
  }
}

const supportService = new SupportService();
export default supportService;