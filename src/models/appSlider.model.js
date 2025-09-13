import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const AppSlider = sequelize.define(
  "AppSlider",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ecommerce: {
      type: DataTypes.INTEGER, // likely a flag (0/1) or a type reference
      allowNull: true,
    },
  },
  {
    tableName: "app_slider",
    timestamps: false, // no createdAt/updatedAt
  }
);

export default AppSlider;
