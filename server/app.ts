import express, { Express } from 'express';
import { indexRouter } from './routes';
import { json } from 'body-parser';
import cors from 'cors';

const app: Express = express();
app.use(cors());
app.use(json());
app.use(indexRouter);

export { app };
