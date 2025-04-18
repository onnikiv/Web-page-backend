import {createThumbnail} from '../../middlewares.js';
import express from 'express';
import multer from 'multer';
import {
  deleteThumbnail,
  getThumbnailById,
  getThumbnails,
  postThumbnail,
  putThumbnail,
} from '../controllers/thumbnail-controller.js';

const thumbnailRouter = express.Router();

const upload = multer({dest: 'public/'});

thumbnailRouter
  .route('/')
  .get(getThumbnails)
  .post(upload.single('file'), createThumbnail, postThumbnail);

thumbnailRouter
  .route('/:id')
  .get(getThumbnailById)
  .put(putThumbnail)
  .delete(deleteThumbnail);

export default thumbnailRouter;
