import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { contracts, contractsId } from './Contracts';

export interface contract_documentsAttributes {
  contractNumber: string;
  contractId?: string;
  currentStatus?: string;
  finalContractLink?: string;
  localContractLink?: string;
  documentFileName?: string;
  documentFileLink?: string;
  localFileLink?: string;
  signedAt?: Date;
}

export type contract_documentsPk = "contractNumber";
export type contract_documentsId = contract_documents[contract_documentsPk];
export type contract_documentsOptionalAttributes = "contractId" | "currentStatus" | "finalContractLink" | "localContractLink" | "documentFileName" | "documentFileLink" | "localFileLink" | "signedAt";
export type contract_documentsCreationAttributes = Optional<contract_documentsAttributes, contract_documentsOptionalAttributes>;

export class contract_documents extends Model<contract_documentsAttributes, contract_documentsCreationAttributes> implements contract_documentsAttributes {
  contractNumber!: string;
  contractId?: string;
  currentStatus?: string;
  finalContractLink?: string;
  localContractLink?: string;
  documentFileName?: string;
  documentFileLink?: string;
  localFileLink?: string;
  signedAt?: Date;

  // contract_documents belongsTo contracts via contractNumber
  contractNumberContract!: contracts;
  getContractNumberContract!: Sequelize.BelongsToGetAssociationMixin<contracts>;
  setContractNumberContract!: Sequelize.BelongsToSetAssociationMixin<contracts, contractsId>;
  createContractNumberContract!: Sequelize.BelongsToCreateAssociationMixin<contracts>;

  static initModel(sequelize: Sequelize.Sequelize): typeof contract_documents {
    return contract_documents.init({
    contractNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'contracts',
        key: 'contract_number'
      },
      field: 'contract_number'
    },
    contractId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'contract_id'
    },
    currentStatus: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'current_status'
    },
    finalContractLink: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'final_contract_link'
    },
    localContractLink: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'local_contract_link'
    },
    documentFileName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'document_file_name'
    },
    documentFileLink: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'document_file_link'
    },
    localFileLink: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'local_file_link'
    },
    signedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'signed_at'
    }
  }, {
    sequelize,
    tableName: 'contract_documents',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__contract__1CA37CCF51EFB591",
        unique: true,
        fields: [
          { name: "contract_number" },
        ]
      },
    ]
  });
  }
}
