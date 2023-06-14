import { DataTypes } from 'sequelize';
import { ExtendedModel } from '../utils/dbHelper';
import db from '../db';
import { generateDefaultCarData } from './hooks/car';

class Car extends ExtendedModel {
  public photo!: string;
  public brand!: string;
  public type!: string;
  public state!: string;
}

Car.init(
  {
    photo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'car',
    hooks: {
      async afterCreate(carInstance) {
        await generateDefaultCarData(carInstance);
      }
    }
  }
);

export default Car;
