import {authenticateToken, createThumbnail} from '../../middlewares.js';
import express from 'express';
import multer from 'multer';
import {
  deleteThumbnail,
  getThumbnailByUserId,
  getThumbnails,
  postThumbnail,
  putThumbnail,
} from '../controllers/thumbnail-controller.js';

const thumbnailRouter = express.Router();

const upload = multer({dest: 'uploads/'});

thumbnailRouter
  .route('/')
  .get(getThumbnails)
  .post(upload.single('file'), createThumbnail, postThumbnail);

thumbnailRouter
  .route('/:id')
  .get(getThumbnailByUserId)
  .put(authenticateToken, putThumbnail)
  .delete(authenticateToken, deleteThumbnail);

export default thumbnailRouter;
