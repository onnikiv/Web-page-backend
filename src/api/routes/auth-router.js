import express from 'express';
import {authUser, getMe} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares.js';

const authRouter = express.Router();

authRouter.route('/login').post(authUser);
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
