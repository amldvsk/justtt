import { app } from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.UNM_SCRIPTS_NODE_PORT || process.env.NODE_PORT || 4040;

import db from './database/db';

app.get('/health', ({}, res) => {
  res.status(200).json({ status: true });
});
db.migrate.latest().then(() => {
  console.log('migrate latest');
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started port ${port} env:${process.env.NODE_ENV}`);
  });
});
process.on('unhandledRejection', function (err) {
  console.log(err);
});
