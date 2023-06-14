import { Request, Response } from 'express';
import { handleEndpointError, CustomError } from '../utils/errorHandler';
import FineDAO from '../dao/fineDAO';
import AmountOfMoneyDAO from '../dao/moneyDAO';
import AmountOfMoney from '../models/money';

export default class FineController {
  private fineDAO: FineDAO;
  private amountOfMoneyDAO: AmountOfMoneyDAO;

  constructor() {
    this.fineDAO = new FineDAO();
    this.amountOfMoneyDAO = new AmountOfMoneyDAO();
  }

  public async getFineById(req: Request, res: Response) {
    try {
      const { fineId } = req.params;
      const fine = await this.fineDAO.getFineById(fineId);
      res.send(fine);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async getFines(req: Request, res: Response) {
    try {
      const { agreementId } = req.params;
      const fines = await this.fineDAO.getFines(agreementId);
      res.send(fines);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async createFine(req: Request, res: Response) {
    try {
      const { agreementId } = req.params;
      const newFine = req.body;
      await this.fineDAO.createFine(agreementId, newFine);
      res.sendStatus(201);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async createFinesFromCSV(req: Request, res: Response) {
    try {
      await this.fineDAO.createFinesFromCSV();
      res.sendStatus(201);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async updateFine(req: Request, res: Response) {
    try {
      const { fineId } = req.params;
      const updatedFine = req.body;
      await this.fineDAO.updateFine(fineId, updatedFine);
      res.sendStatus(200);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async closeFine(req: Request, res: Response) {
    try {
      //@ts-ignore
      const clientId = req.client.id;
      const { fineId } = req.params;

      await this.updateClientBalance(clientId, fineId);
      await this.fineDAO.deleteFine(fineId);
      res.sendStatus(200);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  private async updateClientBalance(clientId, fineId) {
    const fineAmount = await this.amountOfMoneyDAO.getFineAmount(fineId);
    const clientBalance = await this.amountOfMoneyDAO.getBalance(clientId);
    //@ts-ignore
    const newClientBalance = AmountOfMoney.subtractAmounts(clientBalance, fineAmount);
    if (!newClientBalance) {
      throw new CustomError('Balance is not sufficient!');
    }

    await this.amountOfMoneyDAO.updateBalance(clientId, newClientBalance);
  }
}
