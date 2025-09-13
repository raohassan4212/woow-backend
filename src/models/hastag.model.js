import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const Hashtag = sequelize.define(
  "Hashtag",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    viral: {
      type: DataTypes.INTEGER, // 0 = normal, 1 = viral (or trending)
      allowNull: true,
    },
  },
  {
    tableName: "hashtag",
    timestamps: false, // table doesn’t have createdAt/updatedAt
  }
);

export default Hashtag;
