import models from '../models';
import AmountOfMoney from '../models/money';

export default class AmountOfMoneyDAO {
  public async getCollateralAmount(agreementId): Promise<AmountOfMoney> {
    return await models.AmountOfMoney.findOne({ where: { agreementId } });
  }

  public async getRentalCost(carId): Promise<AmountOfMoney> {
    return await models.AmountOfMoney.findOne({ where: { carId } });
  }

  public async getBalance(clientId): Promise<AmountOfMoney> {
    return await models.AmountOfMoney.findOne({ where: { clientId } });
  }

  public async getFineAmount(fineId): Promise<AmountOfMoney> {
    return await models.AmountOfMoney.findOne({ where: { fineId } });
  }

  public async createCollateralAmount(agreementId, newCollateralAmount): Promise<void> {
    await models.AmountOfMoney.create({ agreementId, ...newCollateralAmount });
  }

  public async updateCollateralAmount(agreementId, updatedAmountOfMoney): Promise<void> {
    await models.AmountOfMoney.update(updatedAmountOfMoney, { where: { agreementId } });
  }

  public async updateRentalCost(carId, updatedAmountOfMoney): Promise<void> {
    await models.AmountOfMoney.update(updatedAmountOfMoney, { where: { carId } });
  }

  public async updateBalance(clientId, updatedAmountOfMoney): Promise<void> {
    await models.AmountOfMoney.update(updatedAmountOfMoney, { where: { clientId } });
  }

  public async updateFineAmount(fineId, updatedAmountOfMoney): Promise<void> {
    await models.AmountOfMoney.update(updatedAmountOfMoney, { where: { fineId } });
  }
}
