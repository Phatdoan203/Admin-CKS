import { Sequelize } from 'sequelize-typescript';
import { Contracts } from "./Contracts";
import dotenv from "dotenv";


dotenv.config();

const connectionDB = new Sequelize({
    dialect: 'mssql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'sa',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'WeSign',
    port: Number(process.env.DB_PORT || 1433),
    dialectOptions: {
        options: {
            encrypt: false,
            trustServerCertificate: true
        }
    }  
})

Contracts.initModel(connectionDB);
export { Contracts, connectionDB };
