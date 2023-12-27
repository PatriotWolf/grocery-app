import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProduct,
  editProducts,
  deleteProducts,
} from '../controllers/product.controller';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/create', createProduct);
router.put('/', editProducts);
router.delete('/', deleteProducts);

export default router;
