import express from 'express';
import cors from 'cors';
import api from './api/index.js';

const app = express();

app.use(
  cors({
    origin: ['https://users.metropolia.fi'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('WEBPAGE RESTA API');
});

app.use('/api/v1', api);

export default app;
