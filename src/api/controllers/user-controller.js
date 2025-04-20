import bcrypt from 'bcrypt';
import {validationResult} from 'express-validator';
import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getUser = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      const error = new Error('User not found');
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Invalid or missing fields');
      error.status = 400;
      return next(error);
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await addUser(req.body);
    if (result.user_id) {
      res.status(201).json(result);
    } else {
      const error = new Error('Failed to add user');
      error.status = 400;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
const putUser = async (req, res, next) => {
  try {
    const {currentPassword, newPassword} = req.body;

    if (!currentPassword || !newPassword) {
      const error = new Error('Missing currentPassword or newPassword');
      error.status = 400;
      return next(error);
    }

    const user = await findUserById(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      const error = new Error('Current password is incorrect');
      error.status = 401;
      return next(error);
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    const result = await modifyUser({password: hashedPassword}, req.params.id);

    if (result.message) {
      res.status(200).json({message: 'Password updated successfully'});
    } else {
      const error = new Error('Failed to update password');
      error.status = 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (res.locals.user.role !== 'admin') {
      const error = new Error(
        'Only admins are authorized to delete users currently'
      );
      error.status = 403;
      return next(error);
    }

    const result = await removeUser(req.params.id);
    if (result.message) {
      res.status(200).json(result);
    } else {
      const error = new Error('Failed to delete user');
      error.status = 400;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
