const { O_Auth } = require('../models');

module.exports = {
  saveTokenToBD: (tokens, userID) => O_Auth.create({ ...tokens, userID }),

  updateTokens: (tokens, userID) => O_Auth.updateOne({ userID }, { ...tokens, userID })

};
