import { DataTypes } from 'sequelize';
import { ExtendedModel } from '../utils/dbHelper';
import db from '../db';

class FullName extends ExtendedModel {
  public name!: string;
  public surname!: string;
  public patronymic!: string;
}

FullName.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    patronymic: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'fullName'
  }
);

export default FullName;
