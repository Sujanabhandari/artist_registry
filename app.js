import * as dotenv from 'dotenv';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js';
import artistRouter from './routes/artist.js';

dotenv.config();

const app = express();

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', artistRouter);
const port = process.env.PORT || 3000;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.error(err.stack);
    // render the error page
    res.status(err.statusCode || 500);
    res.send({
        error: err.message,
    });
});

app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
);
