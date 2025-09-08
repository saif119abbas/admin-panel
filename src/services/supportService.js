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

const supportService = new SupportService();
export default supportService;
