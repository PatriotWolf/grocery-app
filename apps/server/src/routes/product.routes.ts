import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  editProducts,
  deleteProducts,
} from '../controllers/product.controller';

const router = Router();

router.get('/', getAllProducts);
router.post('/create', createProduct);
router.put('/', editProducts);
router.delete('/', deleteProducts);

export default router;
