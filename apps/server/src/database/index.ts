import { SequelizeOptions, Sequelize } from 'sequelize-typescript';
import Tutorial from '../models/tutorial.model';
import Product from '../models/product.model';

const DB_CONFIG: SequelizeOptions = {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  port: parseInt(process.env.DATABASE_PORT, 10),
  ssl: true,
  models: [Tutorial, Product],
  query: { raw: true },
};

const SequelizeConnector = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  { ...DB_CONFIG },
);

export default SequelizeConnector;
