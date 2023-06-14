import models from '../models';

export default class FullNameDAO {
  public async createFullName(clientId, newFullName): Promise<void> {
    await models.FullName.create({ clientId, ...newFullName });
  }
}
