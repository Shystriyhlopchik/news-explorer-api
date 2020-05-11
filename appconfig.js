const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || 3000;
const { NODE_ENV } = process.env;
const isProduction = process.env.NODE_ENV === 'production'; // if production, we use secret from env file
const JWT_SECRET = isProduction ? process.env.JWT_SECRET : 'devSecretKey'; // for dev mode, we use 'devSecretKey'


// настройки cookie
const JWT_COOKIE_OPTIONS = {
  maxAge: 3600000 * 24 * 7,
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: true,
};

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // timeframe for which requests are checked/remebered: 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Please try again later',
});

module.exports = {
  PORT,
  JWT_SECRET,
  rateLimiter,
  JWT_COOKIE_OPTIONS,
};
