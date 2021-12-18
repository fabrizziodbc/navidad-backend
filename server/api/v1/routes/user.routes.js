import express from 'express';
import { body } from 'express-validator';
import {
  validId,
  fetchAll,
  create,
  read,
  update,
  deleteById,
} from '../controllers/user.controller.js';

const router = express.Router();

router
  .route('/')
  .get(fetchAll)
  .post(
    body('name', 'Name is required!').notEmpty(),
    body('name', 'You must use at least five (05) characters')
      .isLength({
        min: 5,
      })
      .trim(),
    body('name', 'You exceeded the maximum characters (72)')
      .isLength({
        max: 72,
      })
      .trim(),
    body('email', 'Email is required!').notEmpty(),
    body('email', 'Format invalid').isEmail(),
    body('password', 'Password is required!').notEmpty(),
    body('password', 'You must use at least five (05) characters').isLength({
      min: 5,
    }),
    create,
  );
router.param('id', validId);
router
  .route('/:id')
  .get(read)
  .put(
    body('name', 'You must use at least five (05) characters')
      .isLength({
        min: 5,
      })
      .trim()
      .optional({ nullable: true }),
    update,
  )
  .delete(deleteById);

export default router;
