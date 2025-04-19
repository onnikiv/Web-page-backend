import express from 'express';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import thumbnailRouter from './routes/thumbnail-router.js';
import favouritesRouter from './routes/favourite-router.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/thumbnails', thumbnailRouter);
router.use('/favourites', favouritesRouter);
export default router;
