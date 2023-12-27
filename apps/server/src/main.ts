/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Express } from 'express';
import cors from 'cors';

import * as path from 'path';
import db from './database';
import MainRoute from './routes';
import Product from './models/product.model';
import { seedDB } from './seed';

const app: Express = express();
app.use(cors());
const initApp = async () => {
  console.log('Testing the database connection..');

  // Test the connection.
  try {
    await db.sync({ force: true });

    await Product.bulkCreate(await seedDB(), {
      individualHooks: true,
      returning: true,
    });
    console.log('Connection has been established successfully.');

    app.use(express.json());
    app.use('/assets', express.static(path.join(__dirname, 'assets')));

    MainRoute(app);

    /**
     * Start the web server on the specified port.
     */
    const port = process.env.PORT || 3333;

    app.listen(port, () => {
      console.log(`Server is running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error.original);
  }
};

/**
 * Initialize the application.
 */
initApp();
