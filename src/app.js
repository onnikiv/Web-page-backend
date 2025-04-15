import express from 'express';
import cors from 'cors';
import api from './api/index.js';
import {errorHandler, notFoundHandler} from './middlewares.js';

const app = express();

app.use(
  cors({
    origin: ['https://users.metropolia.fi', 'http://127.0.0.1:5500'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('WEBPAGE REST API');
});

app.use('/api/v1', api);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
