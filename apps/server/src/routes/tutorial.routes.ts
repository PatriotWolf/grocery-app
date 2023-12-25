import { Router } from 'express';
import {
  createTutorial,
  getAllTutorials,
} from '../controllers/tutorial.controller';

const router = Router();

router.get('/', getAllTutorials);
router.post('/create', createTutorial);

export default router;
