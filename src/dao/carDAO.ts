import models from '../models';
import Car from '../models/car';
// import CSVReader from '../csvUtils/csvReader';

export default class CarDAO {
  public async getCarById(carId): Promise<Car> {
    const carInstance = await models.Car.findOne({
      where: { id: carId },
      include: { all: true, nested: true }
    });
    return carInstance.get({ plain: true });
  }

  public async getCars(): Promise<Car[]> {
    const carInstances = await models.Car.findAll({
      include: { all: true, nested: true }
    });
    return carInstances.map((carInstance) => {
      return carInstance.get({ plain: true });
    });
  }

  public async createCar(newCar): Promise<void> {
    await models.Car.create(newCar);
  }

  public async createCarsFromCSV(): Promise<void> {
    // await models.Car.bulkCreate(new CSVReader().getParsedData('car'));
  }

  public async updateCar(carId, updatedCar): Promise<void> {
    await models.Car.update(updatedCar, { where: { id: carId } });
  }

  public async deleteCar(carId): Promise<void> {
    await models.Car.destroy({ where: { id: carId } });
  }
}
