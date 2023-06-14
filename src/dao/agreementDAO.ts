import models from '../models';
import Agreement from '../models/agreement';

export default class AgreementDAO {
  public async getAgreementById(agreementId): Promise<Agreement> {
    const agreementInstance = await models.Agreement.findOne({
      where: { id: agreementId },
      include: { all: true, nested: true }
    });
    return agreementInstance.get({ plain: true });
  }

  public async getAgreementsForClient(clientId): Promise<Agreement[]> {
    const agreementInstances = await models.Agreement.findAll({
      where: { clientId },
      include: { all: true, nested: true }
    });
    return agreementInstances.map((agreementInstance) => {
      return agreementInstance.get({ plain: true });
    });
  }

  public async createAndGetAgreement(clientId, carId, newAgreement): Promise<Agreement> {
    return await models.Agreement.create({ clientId, carId, ...newAgreement });
  }

  public async createAgreementsFromCSV(): Promise<void> {
    // await models.Agreement.bulkCreate(new CSVReader().getParsedData('agreement'));
  }

  public async updateAgreement(agreementId, updatedAgreement): Promise<void> {
    await models.Agreement.update(updatedAgreement, { where: { id: agreementId } });
  }

  public async updateAgreementArchievedStatus(agreementId): Promise<void> {
    await models.Agreement.update({ isArchived: true }, { where: { id: agreementId } });
  }

  public async deleteAgreement(agreementId): Promise<void> {
    await models.Agreement.destroy({ where: { id: agreementId } });
  }
}
