const NODE_ENV = process.env.NODE_ENV || 'develop';
const JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : 'devSecretKey';

module.exports = {
  JWT_SECRET,
  NODE_ENV,
};
