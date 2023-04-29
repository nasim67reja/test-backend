const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const RateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const { notFound, errorHandler } = require('./middlewares/index');

const admin = require('./routes/admin');
const product = require('./routes/product');
const coupon = require('./routes/coupon');
const subscriber = require('./routes/subscriber');
const order = require('./routes/order');
const credentials = require('./routes/credentails');
const dbConnect = require('./utils/db');

dbConnect();

const app = express();

const limiter = RateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  delayAfter: 150,
  delayMs: 1000,
  max: 300, // Limit each IP to 300 requests per `window` (here, per 5 minutes)
});

app.enable('trust proxy');
app.use(limiter);
app.use(morgan('dev'));
app.use(helmet());
// app.use(cors());
app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'https://swopwebnew.vercel.app',
      'https://adminswopnew.netlify.app',
      'https://swopme.co',
      'https://swop-dashboard.vercel.app',
      'ttps://test-frontend-eta-two.vercel.app',
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use('/api/v1/admin', admin);
app.use('/api/v1/product', product);
app.use('/api/v1/coupon', coupon);
app.use('/api/v1/subscriber', subscriber);
app.use('/api/v1/order', order);
app.use('/api/v1/credentials', credentials);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
