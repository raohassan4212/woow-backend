import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const Video = sequelize.define(
  "Video",
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
    fb_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    video: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    thum: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    gif: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    repost_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    section: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    sound_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    privacy_type: {
      type: DataTypes.STRING(155),
      allowNull: true,
    },
    allow_comments: {
      type: DataTypes.STRING(155),
      allowNull: true,
    },
    allow_duet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    repost_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    repost_video_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    repost_comment: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    block: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    duet_video_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    watermark: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    advertise: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    duration: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    viral: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "video", // make sure this matches your MySQL table name
    timestamps: false,  // disable Sequelize’s auto createdAt/updatedAt
  }
);

export default Video;
