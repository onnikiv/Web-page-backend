import {
  addFavourite,
  findFavouriteByUserId,
  listAllFavourites,
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

const getFavouriteByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const favourite = await findFavouriteByUserId(userId);
    if (favourite) {
      res.json(favourite);
    } else {
      const error = new Error('Favourite not found for the given user');
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export {getFavourites, postFavourite, getFavouriteByUserId};
