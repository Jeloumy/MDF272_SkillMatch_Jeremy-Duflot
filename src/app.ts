import express from 'express';
import { jsonApiResponseMiddleware } from './middlewares/json-api-response.middleware';
import { V1Route } from './routes/v1';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(jsonApiResponseMiddleware);

app.use('/v1', V1Route);

app.listen(8000, () => console.log('✅ Server is running on port 8000'))