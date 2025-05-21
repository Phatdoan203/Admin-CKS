import type { Sequelize } from "sequelize";
import { contract_documents as _contract_documents } from "./ContractDocuments";
import type { contract_documentsAttributes, contract_documentsCreationAttributes } from "./ContractDocuments";
import { contracts as _contracts } from "./Contracts";
import type { contractsAttributes, contractsCreationAttributes } from "./Contracts";
import { users as _users } from "./Users";
import type { usersAttributes, usersCreationAttributes } from "./Users";

export {
  _contract_documents as contract_documents,
  _contracts as contracts,
  _users as users,
};

export type {
  contract_documentsAttributes,
  contract_documentsCreationAttributes,
  contractsAttributes,
  contractsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const contract_documents = _contract_documents.initModel(sequelize);
  const contracts = _contracts.initModel(sequelize);
  const users = _users.initModel(sequelize);

  contract_documents.belongsTo(contracts, { as: "contractNumberContract", foreignKey: "contractNumber"});
  contracts.hasOne(contract_documents, { as: "contractDocument", foreignKey: "contractNumber"});

  return {
    contract_documents: contract_documents,
    contracts: contracts,
    users: users,
  };
}
