import express from 'express';
import cors from 'cors';
import api from './api/index.js';

const app = express();

app.use(
  cors({
    origin: [
      'http://127.0.0.1:5500',
      'http://localhost:5500',
      'https://10.120.32.69:3000',
    ],
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
