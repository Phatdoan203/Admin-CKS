import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { contract_documents, contract_documentsCreationAttributes, contract_documentsId } from './ContractDocuments';

export interface contractsAttributes {
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

export type contractsPk = "contractNumber";
export type contractsId = contracts[contractsPk];
export type contractsOptionalAttributes = "mcasNumber" | "cif" | "fullName" | "email" | "mobile" | "identityNumber" | "authChannel" | "status" | "lastUpdated" | "actions";
export type contractsCreationAttributes = Optional<contractsAttributes, contractsOptionalAttributes>;

export class contracts extends Model<contractsAttributes, contractsCreationAttributes> implements contractsAttributes {
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

  // contracts hasOne contract_documents via contractNumber
  contractDocument!: contract_documents;
  getContractDocument!: Sequelize.HasOneGetAssociationMixin<contract_documents>;
  setContractDocument!: Sequelize.HasOneSetAssociationMixin<contract_documents, contract_documentsId>;
  createContractDocument!: Sequelize.HasOneCreateAssociationMixin<contract_documents>;

  static initModel(sequelize: Sequelize.Sequelize): typeof contracts {
    return contracts.init({
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
