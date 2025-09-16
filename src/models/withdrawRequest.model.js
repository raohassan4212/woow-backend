import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const WithdrawRequest = sequelize.define(
  "WithdrawRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false, // withdrawal amount in currency
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // 0 = pending, 1 = approved, 2 = rejected
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    coin: {
      type: DataTypes.INTEGER,
      allowNull: true, // coins converted for withdrawal
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true, // withdrawal email (PayPal, etc.)
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "withdraw_request",
    timestamps: false, // using custom created/updated fields
  }
);

export default WithdrawRequest;
