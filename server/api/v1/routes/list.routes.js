import express from 'express';
import { body } from 'express-validator';
import {
  validId,
  fetchAll,
  create,
  read,
  update,
  getListByUserId,
  deleteById,
} from '../controllers/list.controller.js';

const router = express.Router();

router
  .route('/')
  .get(fetchAll)
  .post(
    body('author', 'author is required!').notEmpty(),
    body('author', 'You must use at least five (03) characters')
      .isLength({
        min: 3,
      })
      .trim(),
    body('author', 'You exceeded the maximum characters (72)')
      .isLength({
        max: 72,
      })
      .trim(),
    body('listName', 'ListName is required!').notEmpty(),
    body('listName', 'You must use at least five (03) characters')
      .isLength({
        min: 3,
      })
      .trim(),
    body('listName', 'You exceeded the maximum characters (72)')
      .isLength({
        max: 72,
      })
      .trim(),
    create,
  );
router.param('id', validId);
router
  .route('/:id')
  .get(read)
  .put(
    body('listName', 'You must use at least five (05) characters')
      .isLength({
        min: 5,
      })
      .trim()
      .optional({ nullable: true }),
    body('listName', 'You exceeded the maximum characters (72)')
      .isLength({
        max: 72,
      })
      .trim()
      .optional({ nullable: true }),
    update,
  )
  .delete(deleteById);
router.route('/users/:userId').get(getListByUserId);
export default router;
