const db = require('../dataBase').getInstance();

module.exports = {
  saveTokenToBD: (authObj) => {
    const O_Auth = db.getModel('O_Auth');

    return O_Auth.create(authObj);
  },

  getTokensByAccess: (access_token) => {
    const O_Auth = db.getModel('O_Auth');

    return O_Auth.findOne({ where: { access_token } });
  },

  getTokensByRefresh: (refresh_token) => {
    const O_Auth = db.getModel('O_Auth');

    return O_Auth.findOne({ where: { refresh_token } });
  },

  deleteTokens: (userID) => {
    const O_Auth = db.getModel('O_Auth');

    return O_Auth.destroy({ where: { userID } });
  },
};
