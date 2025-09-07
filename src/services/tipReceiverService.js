
import { TipReceiverListDto } from "../dtos/tipReceiverListDto";
import { TipReceiverDto } from "../dtos/tipReceiverDto";
import { StatisticsDto } from "../dtos/statisticsDto";
import { TipReceiverStatisticsDto } from "../dtos/tipReceiverStatisticsDto";
import { TransactionsDto } from "../dtos/transactionsDto";
import { PaymentInfoDto } from "../dtos/paymentInfoDto";
import { apiService } from "../api/apiService";
class TipReceiverService {
    constructor() {
    }

    async getTipReceivers(filters) {
        try {
            const pageNumber = filters.pageNumber || 1;
            const pageSize = filters.pageSize || 10;
            const response = await apiService.post(`/TipReceiver?pageNumber=${pageNumber}&pageSize=${pageSize}`, filters);
            return response.data;
        } catch (error) {
            console.error('Error fetching tip receivers:', error);
            return [];
        }
    }

    async getTipReceiverById(id) {
        try {
            const response = await apiService.get(`/TipReceiver/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tip receiver by ID:', error);
            return null;
        }
    }

    async getStatisticsByTipReceiverId(id) {
        try {
            const response = await apiService.get(`/TipReceiver/Statistics/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching statistics by tip receiver ID:', error);
            return null;
        }
    }

    async getStatistics() {
        try {
            const response = await apiService.get(`/TipReceiver/Statistics`);
            return response.data;
        } catch (error) {
            console.error('Error fetching statistics:', error);
            return null;
        }
    }

    async getTransactionsByTipReceiverId(id) {
        try {
            const response = await apiService.get(`/TipReceiver/Transactions/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions by tip receiver ID:', error);
            return null;
        }
    }

    async getPaymentInfoByTipReceiverId(id) {
        try {
            const response = await apiService.get(`/TipReceiver/PaymentInfo/${id}`);
            if (response.success) {
                const paymentInfoDto = {
                    id: response.data.id,
                    accountHolderName: response.data.accountHolderName,
                    IBAN: response.data.IBAN,
                    bankName: response.data.bankName,
                    countryId: response.data.bankCountryId
                }
                return paymentInfoDto;
            } else {
                console.error('Error fetching payment info by tip receiver ID:', response.message);
                return null;
            }
        } catch (error) {
            console.error('Error fetching payment info by tip receiver ID:', error);
            return null;
        }
    }

    async updatePaymentInfoByTipReceiverId(id, paymentInfoDto) {
        try {
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
        }
    }

    async updateTipReceiverById(id, tipReceiverDto) {
        try {
            const response = await apiService.put(`/TipReceiver/${id}`, tipReceiverDto);
            if (response.success) {
                return true;
            } else {
                console.error('Error updating tip receiver by ID:', response.message);
                return false;
            }
        } catch (error) {
            console.error('Error updating tip receiver by ID:', error);
            return false;
        }
    }

    async verifyTipReceiverMobileNumber(id) {
        return true;
    }

}

export default new TipReceiverService();
