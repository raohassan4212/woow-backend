import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const VerificationRequest = sequelize.define(
  "VerificationRequest",
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
    attachment: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    verified: {
      type: DataTypes.INTEGER, // likely 0 = pending, 1 = approved
      allowNull: true,
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created: {
      type: DataTypes.STRING(255), 
      allowNull: true,
    },
  },
  {
    tableName: "verification_request",
    timestamps: false, // disable Sequelize auto timestamps
  }
);

export default VerificationRequest;
