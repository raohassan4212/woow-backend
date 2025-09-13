import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const HashtagVideo = sequelize.define(
  "HashtagVideo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hashtag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    video_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "hashtag_video",
    timestamps: false, // no createdAt/updatedAt
  }
);

export default HashtagVideo;