import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ContractsAttributes {
  contractNumber: string;
  mcasNumber?: string;
  cif?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  identityNumber?: string;
  authChannel?: string;
  status?: string;
  lastUpdated?: string;
  actions?: string;
}

export type ContractsPk = "contractNumber";
export type ContractsId = Contracts[ContractsPk];
export type ContractsOptionalAttributes = "mcasNumber" | "cif" | "fullName" | "email" | "mobile" | "identityNumber" | "authChannel" | "status" | "lastUpdated" | "actions";
export type ContractsCreationAttributes = Optional<ContractsAttributes, ContractsOptionalAttributes>;

export class Contracts extends Model<ContractsAttributes, ContractsCreationAttributes> implements ContractsAttributes {
  contractNumber!: string;
  mcasNumber?: string;
  cif?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  identityNumber?: string;
  authChannel?: string;
  status?: string;
  lastUpdated?: string;
  actions?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Contracts {
    return Contracts.init({
    contractNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      field: 'contract_number'
    },
    mcasNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'mcas_number'
    },
    cif: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'full_name'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    identityNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'identity_number'
    },
    authChannel: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'auth_channel'
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lastUpdated: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'last_updated'
    },
    actions: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'contracts',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__contract__1CA37CCF0C552300",
        unique: true,
        fields: [
          { name: "contract_number" },
        ]
      },
    ]
  });
  }
}
