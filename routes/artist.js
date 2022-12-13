import express from 'express';

const artistRouter = express.Router();

artistRouter.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

export default artistRouter;
