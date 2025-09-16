import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.js';

const Coupon = sequelize.define(
  "Coupon",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    coupon_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // ensures no duplicate codes
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false, // percentage or flat discount value
    },
    expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    limit_users: {
      type: DataTypes.INTEGER,
      allowNull: true, // max number of users who can redeem
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "coupon",
    timestamps: false, // only custom `created`
  }
);

export default Coupon;
