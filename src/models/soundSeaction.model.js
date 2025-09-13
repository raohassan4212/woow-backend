import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const SoundSection = sequelize.define(
  "SoundSection",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "sound_section",
    timestamps: false, // no createdAt/updatedAt
  }
);

export default SoundSection;