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
    const result = await modifyUser(req.body, req.params.id);
    if (result.message) {
      res.status(200).json(result);
    } else {
      const error = new Error('Failed to update user');
      error.status = 400;
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
