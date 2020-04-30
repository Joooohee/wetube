import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

const handleHome = (req, res, next) => res.send('Hello from joohee');

const handleProfile = (req, res, next) => {
  res.send('You are on my joohee');
};

const betweenHome = (req, res, next) => {
  console.log('Between');
  next();
};

app.use(helmet());
app.use(morgan('dev'));

app.get('/', handleHome);

app.get('/profile', handleProfile);

app.listen(PORT, handleListening);
