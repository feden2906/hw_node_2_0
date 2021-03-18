const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../configs/configs');

module.exports = () => {
  const access_token = jwt.sign({}, JWT_SECRET, { expiresIn: 1000000 });
  const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: 100000 });

  return {
    access_token,
    refresh_token
  };
};
