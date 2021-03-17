const db = require('../dataBase').getInstance();

module.exports = {
  saveTokenToBD: (authObj) => {
    const O_Auth = db.getModel('O_Auth');

    // console.log(authObj)
    return O_Auth.create(authObj);
  },

  // updateTokens: (tokens, userID) => O_Auth.updateOne({ userID }, { ...tokens, userID }),

  // getTokensByAccess: (access_token) => O_Auth.findOne({ access_token }).populate('userID'),

  // getTokensByRefresh: (refresh_token) => O_Auth.findOne({ refresh_token }),

};
