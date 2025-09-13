import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const Follower = sequelize.define(
  "Follower",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    notification: {
      type: DataTypes.INTEGER, // likely 0/1 flag
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "follower",
    timestamps: false, // no Sequelize-managed createdAt/updatedAt
  }
);

export default Follower;
