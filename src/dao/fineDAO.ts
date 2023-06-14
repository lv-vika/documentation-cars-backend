import models from '../models';
import Fine from '../models/fine';
// import CSVReader from '../csvUtils/csvReader';

export default class FineDAO {
  public async getFineById(fineId): Promise<Fine> {
    const fineInstance = await models.Fine.findOne({
      where: { id: fineId },
      include: { all: true, nested: true }
    });
    return fineInstance.get({ plain: true });
  }

  public async getFines(agreementId): Promise<Fine[]> {
    const fineInstances = await models.Fine.findAll({
      where: { agreementId },
      include: { all: true, nested: true }
    });
    return fineInstances.map((fineInstance) => {
      return fineInstance.get({ plain: true });
    });
  }

  public async createFine(agreementId, newFine): Promise<void> {
    await models.Fine.create({ agreementId, ...newFine });
  }

  public async createFinesFromCSV(): Promise<void> {
    // await models.Fine.bulkCreate(new CSVReader().getParsedData('fine'));
  }

  public async updateFine(fineId, updatedFine): Promise<void> {
    await models.Fine.update(updatedFine, { where: { id: fineId } });
  }

  public async deleteFine(fineId): Promise<void> {
    await models.Fine.destroy({ where: { id: fineId } });
  }
}
