import { Sequelize } from 'sequelize';
import config from 'config';
//establishing connection with database using host, port, dbName, username and dialect from config file
const dbConfig = config.get('dbConfig');

const db: Sequelize = new Sequelize(dbConfig.dbName, dbConfig.username, dbConfig.pass, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port
});

export default db;
