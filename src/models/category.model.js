import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js'

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // for nested categories
    },
  },
  {
    tableName: "category",
    timestamps: false, // only custom created field
  }
);

export default Category;