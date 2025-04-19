import {
  addFavourite,
  findFavouriteByUserId,
  listAllFavourites,
  removeFavourite,
} from '../models/favourite-model.js';

const getFavourites = async (req, res, next) => {
  try {
    const favourites = await listAllFavourites();
    res.json(favourites);
  } catch (error) {
    next(error);
  }
};

const postFavourite = async (req, res, next) => {
  try {
    const {user_id, restaurantid} = req.body;

    console.log(req.body);

    if (!user_id || !restaurantid) {
      return res.status(400).json({error: 'Missing user_id or restaurant_id'});
    }

    const result = await addFavourite({user_id, restaurantid});

    if (result.favourite_id) {
      res.status(201).json(result);
    } else {
      const error = new Error('Failed to add favourite restaurant');
      error.status = 400;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const getFavouritesByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({error: 'Missing user ID'});
    }

    const favourites = await findFavouriteByUserId(userId);

    if (favourites) {
      res.status(200).json(favourites);
    } else {
      res.status(404).json({error: 'No favourites found for the given user'});
    }
  } catch (error) {
    next(error);
  }
};

const deleteFavourite = async (req, res, next) => {
  try {
    const {user_id, restaurantid} = req.body;

    if (!user_id || !restaurantid) {
      return res.status(400).json({error: 'Missing user_id or restaurantid'});
    }

    const result = await removeFavourite(user_id, restaurantid);

    if (result.message) {
      res.status(200).json(result);
    } else {
      const error = new Error('Failed to delete favourite');
      error.status = 400;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export {getFavourites, postFavourite, getFavouritesByUserId, deleteFavourite};
