import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import locationRoutes from './routes/locationRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

const specs = YAML.load('./public/bundled.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/locations', locationRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    console.log(err.stack);
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
