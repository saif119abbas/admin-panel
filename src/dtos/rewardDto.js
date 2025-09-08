export class RewardDto {
    constructor(country,currency,amount,userId) {
        this.country = country;
        this.currency = currency;
        this.amount= amount;
        this.userId =userId;
    }
}