import type { Sequelize } from "sequelize";
import { Contracts as _Contracts } from "./Contracts";
import type { ContractsAttributes, ContractsCreationAttributes } from "./Contracts";

export {
  _Contracts as Contracts,
};

export type {
  ContractsAttributes,
  ContractsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Contracts = _Contracts.initModel(sequelize);


  return {
    Contracts: Contracts,
  };
}
