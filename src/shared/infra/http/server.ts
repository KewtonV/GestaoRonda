import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';
import AppError from '../../errors/AppError';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  });
});

app.use('/files', express.static(uploadConfig.uploads));

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
