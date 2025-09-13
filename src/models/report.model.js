import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const Report = sequelize.define(
  "Report",
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
    type: {
      type: DataTypes.STRING(255),
      allowNull: true, // can hold values like 'video', 'user', 'comment', etc.
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true, // usually the ID of the entity being reported
    },
    report_reason_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "report",
    timestamps: false, // since only `created` exists
  }
);

export default Report;
