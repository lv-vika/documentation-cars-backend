import Client from './client';
import FullName from './fullName';
import Address from './address';
import Agreement from './agreement';
import Car from './car';
import Fine from './fine';
import AmountOfMoney from './money';

Client.hasOne(FullName, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Client.hasOne(Address, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Client.hasOne(AmountOfMoney, {
  as: 'balance',
  foreignKey: {
    name: 'clientId',
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Client.hasMany(Agreement, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Car.hasMany(Agreement, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Car.hasOne(AmountOfMoney, {
  as: 'rentalCost',
  foreignKey: {
    name: 'carId',
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Agreement.hasMany(Fine, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Agreement.hasOne(AmountOfMoney, {
  as: 'collateralAmount',
  foreignKey: {
    name: 'agreementId',
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Fine.hasOne(AmountOfMoney, {
  as: 'fineAmount',
  foreignKey: {
    name: 'fineId',
    allowNull: true
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export default {
  Client,
  FullName,
  Address,
  Agreement,
  Car,
  Fine,
  AmountOfMoney
};
