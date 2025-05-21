import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface usersAttributes {
  id: number;
  keycloakId?: string;
  username?: string;
  email?: string;
  role?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "keycloakId" | "username" | "email" | "role" | "phone" | "createdAt" | "updatedAt";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  keycloakId?: string;
  username?: string;
  email?: string;
  role?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    keycloakId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'keycloak_id'
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__users__3213E83F3313493E",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
