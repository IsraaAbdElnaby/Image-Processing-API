import express from 'express';
import imageHandler from './api/images';

const routes = express.Router();

routes.use('/images', imageHandler);

export default routes;
