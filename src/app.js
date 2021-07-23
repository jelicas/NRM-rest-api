import cors from 'cors';
import express from 'express';

import { database } from './db/index.js';
import { postRoutes } from './routes/postRoutes.js';

database.initialize();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.options('*', cors());
app.use(cors());

app.use('/', postRoutes);

app.listen(3000, () => {
  console.log('Up and running!');
});
