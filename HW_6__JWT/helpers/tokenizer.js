const jwt = require('jsonwebtoken');

module.exports = () => {
  const access_token = jwt.sign({}, 'SECRET_1', { expiresIn: 10 });
  const refresh_token = jwt.sign({}, 'SECRET_2', { expiresIn: '1m' });

  return {
    access_token,
    refresh_token
  };
};
