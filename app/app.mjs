import express from 'express';
import router from './route/v1';
const app = express();
const port = process.env.PORT || 3000;

app.use('/api/v1', router);

app.listen(port);
