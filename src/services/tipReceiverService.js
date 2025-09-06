import { TipReceiverListDto } from "../../dtos/tipReceiverListDto";
import { TipReceiverDto } from "../../dtos/tipReceiverDto";
import { StatisticsDto } from "../../dtos/statisticsDto";
import { TipReceiverStatisticsDto } from "../../dtos/tipReceiverStatisticsDto";
import { TransactionsDto } from "../../dtos/transactionsDto";
import { PaymentInfoDto } from "../../dtos/paymentInfoDto";
class TipReceiverService {
    constructor() {

    }

    async getTipReceivers(filters) {
        return [new TipReceiverListDto()];
    }

    async getTipReceiverById(id) {
        return new TipReceiverDto();
    }

    async getStatisticsByTipReceiverId(id) {
        return new TipReceiverStatisticsDto();
    }

    async getStatistics() {
        return new StatisticsDto();
    }

    async getTransactionsByTipReceiverId(id) {
        return [new TransactionsDto()];
    }

    async getPaymentInfoByTipReceiverId(id) {
        return new PaymentInfoDto();
    }

    async updatePaymentInfoByTipReceiverId(id, paymentInfoDto) {
        return true;
    }

    async updateTipReceiverById(id, tipReceiverDto) {
        return true;
    }

    async verifyTipReceiverMobileNumber(id) {
        return true;
    }

}

export default new TipReceiverService();
