import { Sequelize } from 'sequelize-typescript';

import config from '@config/config';

const dbSchema = config.dbShema;
const dbHost = config.dbHost;
const dbPort = config.dbPort;
const dbUser = config.dbUser;
const dbPassword = config.dbPassword;

const connection = new Sequelize({
  database: dbSchema,
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
  username: dbUser,
  password: dbPassword,
  storage: ':memory:',
  models: [__dirname + "models"],
});

try {
  console.log(`Banco de dados online.`);
} catch (err) {
  console.log("Não foi possível conectar no banco de dados!");
  console.log(err);
}

export default connection;
