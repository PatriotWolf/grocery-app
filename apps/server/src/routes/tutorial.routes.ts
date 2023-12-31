import { Router } from 'express';
import {
  createTutorial,
  getAllTutorials,
  editTutorials,
  deleteTutorials,
} from '../controllers/tutorial.controller';

const router = Router();

router.get('/', getAllTutorials);
router.post('/create', createTutorial);
router.put('/', editTutorials);
router.delete('/', deleteTutorials);

export default router;
