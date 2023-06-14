import express, { urlencoded, json } from 'express';
import cors from 'cors';
import config from 'config';
import router from './routes';
import db from './db';

const appConfig = config.get('appConfig');

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());
app.use(router);

// db.sync({ force: true })
db.authenticate().then(() => {
    app.listen(appConfig.port, () => {
      console.log(`Server started on port ${appConfig.port}`);
    });
  })
  .catch((err) => console.log(err));
