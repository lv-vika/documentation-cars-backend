import models from '../models';

export default class AddressDAO {
  public async createAddress(clientId, newAddress): Promise<void> {
    await models.Address.create({ clientId, ...newAddress });
  }
}
