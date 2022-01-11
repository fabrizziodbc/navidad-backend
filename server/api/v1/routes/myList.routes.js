import express from 'express';
import passport from 'passport';
/* import { body } from 'express-validator'; */
import {
  /*  validId, */
  create,
  /* read,
  update, */
  getListByUserId,
/*   deleteById, */
} from '../controllers/list.controller.js';

const router = express.Router();

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), getListByUserId)
  .post(
    passport.authenticate('jwt', { session: false }),
    create,
  );
/* router.param('id', validId);
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
router.route('/users/:userId').get(getListByUserId); */
export default router;
