/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Express } from 'express';
import * as path from 'path';
import db from './database';
import MainRoute from './routes';

const app: Express = express();

const initApp = async () => {
  console.log('Testing the database connection..');

  // Test the connection.
  try {
    await db.sync();
    console.log('Connection has been established successfully.');

    /**
     * Start the web server on the specified port.
     */
    app.use(express.json());
    app.use('/assets', express.static(path.join(__dirname, 'assets')));

    MainRoute(app);

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
