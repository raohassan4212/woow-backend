import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const Gift = sequelize.define(
  "Gift",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    coin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // number of coins required
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING(255),
      allowNull: true, // can define display position/order
    },
    featured: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // 0 = not featured, 1 = featured
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "gift",
    timestamps: false, // only custom `created` field
  }
);

export default Gift;
