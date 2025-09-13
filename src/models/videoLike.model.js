import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const VideoLike = sequelize.define(
  "VideoLike",
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
    video_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "video_like",
    timestamps: false, // disable Sequelize auto timestamps
  }
);

export default VideoLike;
