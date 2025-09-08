import { RewardDto } from "../dtos/rewardDto";

class CommonsService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}
  async reward(data) {
    const transData = new RewardDto(
      data.country,
      data.currency,
      data.amount,
      data.userId
    );
    console.log(transData);
    return true;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CommonsService();
