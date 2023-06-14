import { DataTypes } from 'sequelize';
import { ExtendedModel } from '../utils/dbHelper';
import db from '../db';
import { generateDefaultClientData } from './hooks/client';

class Client extends ExtendedModel {
  public avatar!: string;
  public email!: string;
  public password!: string;
}

Client.init(
  {
    avatar: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'client',
    hooks: {
      async afterCreate(clientInstance) {
        await generateDefaultClientData(clientInstance);
      }
    }
  }
);

export default Client;
