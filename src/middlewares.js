/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import sharp from 'sharp';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  let extension = 'jpg';
  // if (req.file.mimetype === 'image/png') {
  //   extension = 'png';
  // }
  // muutetaan tiedoston kokoa
  await sharp(req.file.path)
    .resize(100, 100)
    .toFile(`${req.file.path}_thumb.${extension}`);

  // poistetaan lopuksi alkuperäinen tiedosto säästämään tilaa
  const fs = await import('fs/promises');
  await fs.unlink(req.file.path);

  next();
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
  }
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

export {authenticateToken, createThumbnail, notFoundHandler, errorHandler};
