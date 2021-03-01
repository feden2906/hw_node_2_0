const User = require('../dataBase/models/User');
const statusMessages = require('../constants/statusMessages');
require('../dataBase/models/Car');

module.exports = {
  findAllUsers: async (prefLang) => {
    const users = await User.find();

    if (users) {
      return users;
    }

    throw new Error(statusMessages.USERS_NOT_FOUND[prefLang]);
  },

  findUserById: async (userID, prefLang) => {
    const user = await User.findById(userID);

    if (user) {
      return user;
    }

    throw new Error(statusMessages.USER_NOT_FOUND[prefLang]);
  },

  createUser: (userObject) => User.create(userObject),

  deleteUser: (userID) => User.findByIdAndDelete(userID)
};
