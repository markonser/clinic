'use strict';

import {db} from '../index.js';

const {Model, DataTypes} = require('sequelize');
class RecordsModel extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // static associate(models) {
  //   // define association here
  // }
}

export const Records = RecordsModel.init({
  fio: DataTypes.STRING,
  day: DataTypes.INTEGER,
  isHistory: DataTypes.BOOLEAN,
  doctorId: DataTypes.INTEGER,
  patientId: DataTypes.INTEGER,
  money: DataTypes.INTEGER,
  services: DataTypes.STRING,
  doctorNotes: DataTypes.STRING,
  adminFio: DataTypes.STRING,
  doctorFio: DataTypes.STRING,
  createdAt: {type: DataTypes.DATE},
  updatedAt: {type: DataTypes.DATE},
}, {
  tableName: 'Records',
  sequelize: db,
});