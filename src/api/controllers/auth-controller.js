import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {login} from '../models/user-model.js';

const authUser = async (req, res) => {
  const result = await login(req.body.username);

  const passwordValid = bcrypt.compareSync(req.body.password, result.password);

  console.log('password is valid', passwordValid);

  if (!passwordValid) {
    res.sendStatus(401);
    return;
  }

  const userWithNoPassword = {
    user_id: result.user_id,
    name: result.name,
    username: result.username,
    email: result.email,
    role: result.role,
  };

  // eslint-disable-next-line no-undef
  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({user: userWithNoPassword, token});
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.sendStatus(401);
  }
};

export {authUser, getMe};
