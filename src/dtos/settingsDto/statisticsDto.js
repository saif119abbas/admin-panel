export class StatisticsDto {
    constructor(dto) {
        this.totalNumberOfUsers = dto.totalNumberOfUsers;
        this.totalNumberOfActiveUsers = dto.totalNumberOfActiveUsers;
        this.totalNumberOfSuperAdmins = dto.totalNumberOfSuperAdmins;
        this.totalNumberOfAdmins = dto.totalNumberOfAdmins;
        this.totalNumberOfMaketingUsers= dto.totalNumberOfMaketingUsers;
        this.totalNumberOfCustomerSupportUsers= dto.totalNumberOfCustomerSupportUsers;
    }
}