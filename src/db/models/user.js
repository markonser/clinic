'use strict';
import {db} from '../index.js';
const {Model, DataTypes} = require('sequelize');
class UserModel extends Model {

  // static associate(models) {
  //   // define association here
  // }
}

export const Users = UserModel.init({
  login: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  fio: DataTypes.STRING,
  passport: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  born: DataTypes.INTEGER,
  createdAt: {type: DataTypes.DATE},
  updatedAt: {type: DataTypes.DATE},
}, {
  tableName: 'Users',
  sequelize: db,
  // underscored: true,
});