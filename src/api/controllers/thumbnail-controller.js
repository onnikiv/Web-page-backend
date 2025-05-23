import {
  addThumbnail,
  findThumbnailByUserId,
  listAllThumbnails,
  modifyThumbnail,
  removeThumbnail,
} from '../models/thumbnail-model.js';

const getThumbnails = async (req, res, next) => {
  try {
    const thumbnails = await listAllThumbnails();
    res.json(thumbnails);
  } catch (error) {
    next(error);
  }
};

const getThumbnailByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const thumbnail = await findThumbnailByUserId(userId);
    if (thumbnail) {
      res.json(thumbnail);
    } else {
      const error = new Error('Thumbnail not found for the given user');
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const postThumbnail = async (req, res, next) => {
  try {
    if (!req.file || !req.body.user_id) {
      return res.status(400).json({error: 'Missing file or user_id'});
    }

    req.body.filename = req.file.filename;

    const result = await addThumbnail(req.body);

    if (result.img_id) {
      res.status(201).json(result);
    } else {
      res.status(400).json({error: 'Failed to add thumbnail'});
      const error = new Error('Failed to add thumbnail');
      error.status = 400;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const putThumbnail = async (req, res, next) => {
  try {
    console.log(req.body, req.params.id);
    const result = await modifyThumbnail(req.body, req.params.id);
    if (result.message) {
      res.status(200).json(result);
    } else {
      const error = new Error('Failed to update thumbnail');
      error.status = 400;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const deleteThumbnail = async (req, res, next) => {
  try {
    const result = await removeThumbnail(req.params.id);
    if (result.message) {
      res.status(200).json(result);
    } else {
      const error = new Error('Failed to delete thumbnail');
      error.status = 400;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export {
  getThumbnails,
  getThumbnailByUserId,
  postThumbnail,
  putThumbnail,
  deleteThumbnail,
};
