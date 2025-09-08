import { TicketListDto } from "../dtos/supportDto/ticketListDto";
import { StatisticsDto } from "../dtos/supportDto/statisticsDto";
import { UserByTicket } from "../dtos/supportDto/userByTicket";
import { TicketDetailsDto } from "../dtos/supportDto/ticketDetailsDto";
import apiService from "../api/apiService";

class SupportService {
    async getTickets(filters) {
        try {
            const response = await apiService.get("/SupportIssue/0");
            return response.data;
        } catch (error) {
            console.error('Error fetching tip receivers:', error);
            return [];
        }
    }

    async getUser(id) {
        try {
            const response = await apiService.get(`/TipReceiver/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tip receiver by ID:', error);
            return null;
        }
    }

    async getStatistics() {
        try {
            const response = await apiService.get("/SupportIssue/Statistics");
            return response.data;
        } catch (error) {
            console.error('Error fetching statistics:', error);
            return null;
        }
    }

    async getTicketDetails(id) {
        try {
            const response = await apiService.get(`/SupportIssue/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching ticket details:', error);
            return null;
        }
    }

    async createTicket(ticketData) {
        try {
            const response = await apiService.post('/SupportIssue', ticketData);
            return response.data;
        } catch (error) {
            console.error('Error creating ticket:', error);
            throw error;
        }
    }

    async updateTikcet(id, ticketDetailsDto) {
        try {
            return true
        } catch (error) {
            console.error('Error updating payment info by tip receiver ID:', error);
            return false;
        }
    }
}

const supportService = new SupportService();
export default supportService;
