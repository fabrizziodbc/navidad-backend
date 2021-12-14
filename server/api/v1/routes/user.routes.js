import express from 'express';
import {
  fetchAll,
  create,
  read,
  update,
  deleteById,
} from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').get(fetchAll).post(create);
router.route('/:id').get(read).put(update).delete(deleteById);

export default router;
