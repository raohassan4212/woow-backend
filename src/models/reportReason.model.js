import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const ReportReason = sequelize.define(
  "ReportReason",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "report_reason",
    timestamps: false, // only `created` is present
  }
);

export default ReportReason;
