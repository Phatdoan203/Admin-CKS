import { Sequelize } from 'sequelize-typescript';
import { contracts } from "./Contracts";
import { contract_documents } from './ContractDocuments';
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

contract_documents.initModel(connectionDB);
contracts.initModel(connectionDB);
export { contracts, contract_documents, connectionDB };
