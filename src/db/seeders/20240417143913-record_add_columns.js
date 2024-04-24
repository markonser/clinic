'use strict';

const {DataTypes} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Records',
        'services',
        {
          type: DataTypes.STRING
        }
      ),
      queryInterface.addColumn(
        'Records',
        'doctorNotes',
        {
          type: DataTypes.STRING
        }
      ),
      queryInterface.addColumn(
        'Records',
        'money',
        {
          type: DataTypes.INTEGER
        }
      ),
      queryInterface.addColumn(
        'Records',
        'adminFio',
        {
          type: DataTypes.INTEGER
        }
      ),
    ]);
  }

  // down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  // }
};
