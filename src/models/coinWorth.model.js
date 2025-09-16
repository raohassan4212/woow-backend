import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js'

const CoinWorth = sequelize.define(
  "CoinWorth",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false, // price value of coin(s)
    },
  },
  {
    tableName: "coin_worth",
    timestamps: false, // no createdAt / updatedAt in this table
  }
);

export default CoinWorth;
