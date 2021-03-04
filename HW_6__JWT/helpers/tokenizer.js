const jwt = require('jsonwebtoken');

module.exports = {
  access_token: jwt.sign({}, 'SECRET_1', { expiresIn: 10 }),
  refresh_token: jwt.sign({}, 'SECRET_2', { expiresIn: '1m' })
};
