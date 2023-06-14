import { Request, Response } from 'express';
import { CustomError, handleEndpointError } from '../utils/errorHandler';
import AgreementDAO from '../dao/agreementDAO';
import AmountOfMoneyDAO from '../dao/moneyDAO';
import FineDAO from '../dao/fineDAO';
import AmountOfMoney from '../models/money';
import { getRandomNumber } from '../utils/helper';

export default class AgreementController {
  private agreementDAO: AgreementDAO;
  private amountOfMoneyDAO: AmountOfMoneyDAO;
  private fineDAO: FineDAO;

  constructor() {
    this.agreementDAO = new AgreementDAO();
    this.amountOfMoneyDAO = new AmountOfMoneyDAO();
    this.fineDAO = new FineDAO();
  }

  public async getAgreementById(req: Request, res: Response) {
    try {
      const { agreementId } = req.params;
      const agreement = await this.agreementDAO.getAgreementById(agreementId);
      res.send(agreement);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async getAgreementsForClient(req: Request, res: Response) {
    try {
      //@ts-ignore
      const clientId = req.client.id;
      const agreements = await this.agreementDAO.getAgreementsForClient(clientId);
      res.send(agreements);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async issueAgreement(req: Request, res: Response) {
    try {
      //@ts-ignore
      const clientId = req.client.id;
      const { carId, newAgreement } = req.body;

      await this.checkClientAgreementHistory(clientId);
      await this.updateClientBalanceAfterIssue(clientId, carId);
      const agreement = await this.agreementDAO.createAndGetAgreement(clientId, carId, newAgreement);
      await this.createCollateralAmountAfterIssue(agreement.id, carId);
      res.sendStatus(201);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  private async checkClientAgreementHistory(clientId) {
    const agreements = await this.agreementDAO.getAgreementsForClient(clientId);
    const activeAgreements = agreements.filter((agreement) => !agreement.isArchived);
    if (activeAgreements.length) {
      throw new CustomError("Can't issue new agreement! Close the previous one first!");
    }
  }

  private async updateClientBalanceAfterIssue(clientId, carId) {
    const clientBalance = await this.amountOfMoneyDAO.getBalance(clientId);
    const carRentalCost = await this.amountOfMoneyDAO.getRentalCost(carId);
    const newCollateralAmount = {
      hryvnias: Math.floor(carRentalCost.hryvnias / 20),
      kopiykas: Math.floor(carRentalCost.kopiykas / 20)
    };
    //@ts-ignore
    const totalCost = AmountOfMoney.addAmounts(carRentalCost, newCollateralAmount);
    //@ts-ignore
    const newClientBalance = AmountOfMoney.subtractAmounts(clientBalance, totalCost);
    if (!newClientBalance) {
      throw new CustomError('Balance is not sufficient!');
    }
    await this.amountOfMoneyDAO.updateBalance(clientId, newClientBalance);
  }

  private async createCollateralAmountAfterIssue(agreementId, carId) {
    const carRentalCost = await this.amountOfMoneyDAO.getRentalCost(carId);
    const newCollateralAmount = {
      hryvnias: Math.floor(carRentalCost.hryvnias / 20),
      kopiykas: Math.floor(carRentalCost.kopiykas / 20)
    };
    await this.amountOfMoneyDAO.createCollateralAmount(agreementId, newCollateralAmount);
  }

  public async createAgreementsFromCSV(req: Request, res: Response) {
    try {
      await this.agreementDAO.createAgreementsFromCSV();
      res.sendStatus(201);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  public async closeAgreement(req: Request, res: Response) {
    try {
      //@ts-ignore
      const clientId = req.client.id;
      const { agreementId } = req.params;

      await this.randomlyGenerateFine(agreementId); // Just for showcase
      await this.checkClientFineHistory(agreementId);
      await this.updateClientBalanceAfterClose(clientId, agreementId);
      await this.agreementDAO.updateAgreementArchievedStatus(agreementId);
      res.sendStatus(200);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }

  private async randomlyGenerateFine(agreementId) {
    if (getRandomNumber(0, 100) < 10) {
      const newFine = { reason: 'Car is damaged!' };
      await this.fineDAO.createFine(agreementId, newFine);
    }
  }

  private async checkClientFineHistory(agreementId) {
    const agreement = await this.agreementDAO.getAgreementById(agreementId);
    //@ts-ignore
    if (agreement.fines.length) {
      throw new CustomError("Can't close agreement! Pay the fine first!");
    }
  }

  private async updateClientBalanceAfterClose(clientId, agreementId) {
    const clientBalance = await this.amountOfMoneyDAO.getBalance(clientId);
    const collateralAmount = await this.amountOfMoneyDAO.getCollateralAmount(agreementId);
    //@ts-ignore
    const newClientBalance = AmountOfMoney.addAmounts(clientBalance, collateralAmount);
    await this.amountOfMoneyDAO.updateBalance(clientId, newClientBalance);
  }

  public async deleteAgreement(req: Request, res: Response) {
    try {
      const { agreementId } = req.params;
      await this.agreementDAO.deleteAgreement(agreementId);
      res.sendStatus(200);
    } catch (e) {
      handleEndpointError(e, res, 400);
    }
  }
}
