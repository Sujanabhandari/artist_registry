import express from 'express';
import searchArtist from '../controllers/Artist.js';

const artistRouter = express.Router();

artistRouter.route('/artists').get(searchArtist);

export default artistRouter;
