import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { handleEndpointError, CustomError } from '../utils/errorHandler';
import ClientDAO from '../dao/clientDAO';
import FullNameDAO from '../dao/fullNameDAO';
import AddressDAO from '../dao/addressDAO';

const authConfig = config.get('authConfig');

export default class AuthController {
  private clientDAO: ClientDAO;
  private fullNameDAO: FullNameDAO;
  private addressDAO: AddressDAO;

  constructor() {
    this.clientDAO = new ClientDAO();
    this.fullNameDAO = new FullNameDAO();
    this.addressDAO = new AddressDAO();
  }

  public async login(req: Request, res: Response) {
    try {
      const { newClient, newFullName, newAddress } = req.body;
      const { email, password } = newClient;
      let client = await this.clientDAO.getClientByEmail(email);
      if (!client) {
        this.verifyClientData(newFullName, newAddress);
        client = await this.clientDAO.createAndGetClient(newClient);
        await this.fullNameDAO.createFullName(client.id, newFullName);
        await this.addressDAO.createAddress(client.id, newAddress);
      } else {
        this.verifyClient(client, password);
      }

      const token = jwt.sign({ id: client.id, email, password }, authConfig.secret, { expiresIn: '1d' });
      res.send({ token });
    } catch (e) {
      handleEndpointError(e, res, 401);
    }
  }

  private verifyClientData(newFullName, newAddress) {
    if (!newFullName || !newAddress) {
      throw new CustomError('You have to sign up first!');
    }
  }

  private verifyClient(client, password) {
    if (client.password !== password) {
      throw new CustomError('Wrong password!');
    }
  }
}
