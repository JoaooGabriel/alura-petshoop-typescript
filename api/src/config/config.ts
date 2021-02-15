import dotenv from 'dotenv';

dotenv.config();

const serverPort = process.env['SERVER_PORT'];
const dbShema = process.env['DB_SCHEMA'];
const dbHost = process.env['DB_HOST'];
const dbPort = process.env['DB_PORT'];
const dbUser = process.env['DB_USER'];
const dbPassword = process.env['DB_PASSWORD'];

const config = {
    serverPort,
    dbShema,
    dbHost,
    dbPort: parseInt(dbPort as string),
    dbUser,
    dbPassword,
}

export default config;