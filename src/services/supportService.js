import apiService from "../api/apiService";


import { TicketListDto } from "../dtos/supportDto/ticketListDto";
import { StatisticsDto } from "../dtos/supportDto/statisticsDto";
import { UserByTicket } from "../dtos//supportDto/userByTicket";
import { TicketDetailsDto } from "../dtos/supportDto/ticketDetailsDto";
import { apiService } from "../api/apiService";

class SupportService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
    }

    async getTickets(filters) {
        try {
            const response = await apiService.get("/SupportIssue/0");
            return response.data;
        } catch (error) {
            console.error('Error fetching tip receivers:', error);
            return [];
        }
    }
    async deleteTicket(id)
    {
        console.log(id);
        return true
    }

    async getUser(id) {
        console.log("ticket id======",id)
        return new UserByTicket()

      /*  try {
            const response = await apiService.get(`/TipReceiver/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tip receiver by ID:', error);
            return null;
        }*/
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

    async updateTikcet(id, status) {
        try {
            // status should be number 
            const response = await apiService.put(`/SupportIssue/${id}`, {
                status
            });
            return response.data;
        } catch (error) {
            console.error('Error updating ticket status:', error);
            return false;
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
const supportService = new SupportService();
export default supportService;

