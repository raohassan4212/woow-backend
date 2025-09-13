import { Sequelize } from 'sequelize';
import config from './env.js';
import logger from '../utils/logger.js';

const { db } = config;

const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  port: db.port,
  dialect: 'mysql',
  logging: (msg) => logger.debug(msg),
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
    
    if (config.env === 'development') {
      // In development, drop and recreate tables on every app start
      await sequelize.sync();
    } else {
      await sequelize.sync();
    }
    
    logger.info('Database synchronized.');
    console.log("Database synchronized. dsdsadsadas");
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export { sequelize };

export default dbConnection;
