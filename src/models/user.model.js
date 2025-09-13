import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT("medium"),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    social_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    salt: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    profile_pic: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    profile_pic_small: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    social: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    device_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lat: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    long: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    online: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    verified: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    auth_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    version: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    device: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_wallet: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    wallet: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    reset_wallet_datetime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    post_video_notification: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    private: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    shadow_ban: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    referral_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "user",
    timestamps: false, // since you have `created` column, but no `updatedAt`
  }
);


// // Hash password before saving
// User.beforeSave(async (user) => {
//   if (user.changed('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
// });

// // Instance method to check if password matches
// User.prototype.isPasswordMatch = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// // Override toJSON to exclude password
// User.prototype.toJSON = function () {
//   const values = { ...this.get() };
//   delete values.password;
//   return values;
// };

export default User;
