
import { TicketListDto } from "../dtos/supportDto/ticketListDto";
import { StatisticsDto } from "../dtos/supportDto/statisticsDto";
import { UserByTicket } from "../dtos//supportDto/userByTicket";
import { TicketDetailsDto } from "../dtos/supportDto/ticketDetailsDto";

import { apiService } from "../api/apiService";
class SupportService {
    constructor() {
    }

    async getTickets(filters) {
     return [new TicketListDto()]
      /*  try {
            const pageNumber = filters.pageNumber || 1;
            const pageSize = filters.pageSize || 10;
            const response = await apiService.post(`/TipReceiver?pageNumber=${pageNumber}&pageSize=${pageSize}`, filters);
            return response.data;
        } catch (error) {
            console.error('Error fetching tip receivers:', error);
            return [];
        }*/
    }

    async getUser(id) {
        return new UserByTicket()
      /* try {
            const response = await apiService.get(`/TipReceiver/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tip receiver by ID:', error);
            return null;
        }*/
    }


    async getStatistics() {
        return new StatisticsDto()
      /*  try {
            const response = await apiService.get(`/TipReceiver/Statistics`);
            return response.data;
        } catch (error) {
            console.error('Error fetching statistics:', error);
            return null;
        }*/
    }

    async getTicketDetails(id) {
        
        return new TicketDetailsDto()
      /* try {
            const response = await apiService.get(`/TipReceiver/Transactions/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions by tip receiver ID:', error);
            return null;
        }*/
    }


    async updateTikcet(id, ticketDetailsDto) {
        return true
      /*  try {
            const response = await apiService.put(`/TipReceiver/PaymentInfo/${id}`, {
                accountHolderName: paymentInfoDto.accountHolderName,
                IBAN: paymentInfoDto.IBAN,
                bankName: paymentInfoDto.bankName,
                bankCountryId: paymentInfoDto.countryId
            });
            if (response.success) {
                return true;
            } else {
                console.error('Error updating payment info by tip receiver ID:', response.message);
                return false;
            }
        } catch (error) {
            console.error('Error updating payment info by tip receiver ID:', error);
            return false;
        }*/
    }



}

export default new SupportService();
