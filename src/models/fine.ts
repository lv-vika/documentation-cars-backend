import { DataTypes } from 'sequelize';
import { ExtendedModel } from '../utils/dbHelper';
import db from '../db';
import { generateDefaultFineData } from './hooks/fine';

class Fine extends ExtendedModel {
  public reason!: string;
}

Fine.init(
  {
    reason: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'fine',
    hooks: {
      async afterCreate(fineInstance) {
        await generateDefaultFineData(fineInstance);
      }
    }
  }
);

export default Fine;
