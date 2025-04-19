import express from 'express';
//import {authenticateToken} from '../../middlewares.js';
import {
  deleteFavourite,
  getFavouritesByUserId,
  getFavourites,
  postFavourite,
} from '../controllers/favourite-controller.js';
import {authenticateToken} from '../../middlewares.js';

const favouritesRouter = express.Router();

favouritesRouter.route('/').get(getFavourites).post(postFavourite);

favouritesRouter
  .route('/:id')
  .get(getFavouritesByUserId)
  .delete(authenticateToken, deleteFavourite);

export default favouritesRouter;
