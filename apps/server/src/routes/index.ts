import { Express } from 'express';
import tutorialRouter from './tutorial.routes';
import productRouter from './product.routes';

const MainRoute = (app: Express) => {
  app.get('/api', (_req, res) =>
    res.status(200).send({
      message: 'Welcome to the Server API!',
    }),
  );
  app.use('/tutorials', tutorialRouter);
  app.use('/products', productRouter);
};

export default MainRoute;
