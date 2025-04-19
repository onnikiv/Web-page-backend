import express from 'express';
//import {authenticateToken} from '../../middlewares.js';
import {
  getFavouriteByUserId,
  getFavourites,
  postFavourite,
} from '../controllers/favourite-controller.js';

const favouritesRouter = express.Router();

favouritesRouter.route('/').get(getFavourites).post(postFavourite);

favouritesRouter.route('/:id').get(getFavouriteByUserId);
// .delete(authenticateToken, deleteFavourite);

export default favouritesRouter;
