import {Sequelize} from 'sequelize';
export const db = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,

  {
    host: process.env.MYSQL_HOST,
    port: 3306,
    connectTimeout: 60000,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    // timezone: '+03:00',
    logging: console.log,
    pool: {
      max: 65,
      min: 0,
      acquire: 60000,
      idle: 60000
    }
  }
);

try {
  await db.authenticate();
  console.log('@@@@@@@@@@@@@@Connection has been established successfully.');
} catch (error) {
  console.error('@@@@@@@@@@@@@@@Unable to connect to the database:', error);
}