import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const Topic = sequelize.define(
  "Topic",
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
    view: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // default 0 views
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "topic",
    timestamps: false, // only custom `created` field
  }
);

export default Topic;
