import { Request, Response } from 'express';
import { handleEndpointError } from '../utils/errorHandler';
import CarDAO from '../dao/carDAO';

export default class CarController {
  private carDAO: CarDAO;

  constructor() {
    this.carDAO = new CarDAO();
  }

  public async getCarById(req: Request, res: Response) {
    try {
      const { carId } = req.params;
      const car = await this.carDAO.getCarById(carId);
      res.send(car);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async getCars(req: Request, res: Response) {
    try {
      const cars = await this.carDAO.getCars();
      res.send(cars);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async createCar(req: Request, res: Response) {
    try {
      const newCar = req.body;
      await this.carDAO.createCar(newCar);
      res.sendStatus(201);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async createCarsFromCSV(req: Request, res: Response) {
    try {
      await this.carDAO.createCarsFromCSV();
      res.sendStatus(201);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async updateCar(req: Request, res: Response) {
    try {
      const { carId } = req.params;
      const updatedCar = req.body;
      await this.carDAO.updateCar(carId, updatedCar);
      res.sendStatus(200);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async deleteCar(req: Request, res: Response) {
    try {
      const { carId } = req.params;
      await this.carDAO.deleteCar(carId);
      res.sendStatus(200);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }
}
