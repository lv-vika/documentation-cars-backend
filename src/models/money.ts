import { DataTypes } from 'sequelize';
import { ExtendedModel } from '../utils/dbHelper';
import db from '../db';
import { minAmountOfKopiykas, maxAmountOfKopiykas } from '../constants';

interface IAmountOfMoney {
  hryvnias: number;
  kopiykas: number;
}

class AmountOfMoney extends ExtendedModel {
  public hryvnias!: number;
  public kopiykas!: number;
}

AmountOfMoney.init(
  {
    hryvnias: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kopiykas: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'amountOfMoney'
  }
);

//@ts-ignore
AmountOfMoney.addAmounts = (
  firstAmount: AmountOfMoney | IAmountOfMoney,
  secondAmount: AmountOfMoney | IAmountOfMoney
): IAmountOfMoney => {
  let hryvnias = firstAmount.hryvnias + secondAmount.hryvnias;
  let kopiykas = firstAmount.kopiykas + secondAmount.kopiykas;
  if (kopiykas >= maxAmountOfKopiykas) {
    kopiykas -= maxAmountOfKopiykas;
    hryvnias++;
  }
  return { hryvnias, kopiykas };
};

//@ts-ignore
AmountOfMoney.subtractAmounts = (
  firstAmount: AmountOfMoney | IAmountOfMoney,
  secondAmount: AmountOfMoney | IAmountOfMoney
): IAmountOfMoney | null => {
  let kopiykas = firstAmount.kopiykas - secondAmount.kopiykas;
  let hryvnias = firstAmount.hryvnias - secondAmount.hryvnias;
  if (kopiykas < minAmountOfKopiykas) {
    kopiykas += maxAmountOfKopiykas;
    hryvnias--;
  }
  if (hryvnias < 0) {
    return null;
  }
  return { hryvnias, kopiykas };
};

export default AmountOfMoney;
