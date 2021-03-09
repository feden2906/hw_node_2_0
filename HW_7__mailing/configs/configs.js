module.exports = {
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/users_cars',
  JWT_SECRET: process.env.JWT_SECRET || 'MY_SECRET',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'MY_REFRESH_SECRET',
  PORT: process.env.PORT || 5000,

  ROOT_EMAIL: process.env.ROOT_EMAIL || 'test@gmail.com',
  ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '12345'
};
