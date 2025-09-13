// import { DataTypes } from 'sequelize';
// import { sequelize } from '../config/db.js';
// import crypto from 'crypto';

// const PasswordResetToken = sequelize.define(
//   'PasswordResetToken',
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     token: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       index: true,
//     },
//     user_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: 'users',
//         key: 'id',
//       },
//       onDelete: 'CASCADE',
//     },
//     expires: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true,
//     underscored: true,
//     tableName: 'password_reset_tokens',
//     indexes: [
//       {
//         unique: true,
//         fields: ['token'],
//       },
//     ],
//   }
// );

// /**
//  * Generate a reset token for a user
//  * @param {string} userId - The user's ID
//  * @returns {Promise<Object>} The reset token document
//  */
// PasswordResetToken.generate = async function (userId) {
//   const token = crypto.randomBytes(32).toString('hex');
//   const expires = new Date();
//   expires.setHours(expires.getHours() + 1); // Token expires in 1 hour
  
//   // Remove any existing tokens for this user
//   await this.destroy({ where: { user_id: userId } });
  
//   // Create and return the new token
//   const tokenDoc = await this.create({
//     token,
//     user_id: userId,
//     expires,
//   });
  
//   return tokenDoc.token;
// };

// /**
//  * Verify if a reset token is valid
//  * @param {string} token - The token to verify
//  * @returns {Promise<Object|null>} The token document if valid, null otherwise
//  */
// PasswordResetToken.verify = async function (token) {
//   const tokenDoc = await this.findOne({
//     where: {
//       token,
//       expires: { [sequelize.Op.gt]: new Date() },
//     },
//   });
  
//   return tokenDoc;
// };

// export default PasswordResetToken;
