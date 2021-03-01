const User = require('../dataBase/models/User');
const statusMessages = require('../constants/statusMessages');

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

  createUser: async (userObject) => { // TODO   Не зрозумів як додати перевірку на унікальність емейлу
    // const user = User.find({ email: userObject.email })
    //
    // if (user) {
    //   throw new Error(statusMessages.USER_IS_EXISTS[prefLang]);
    // }

    await User.create(userObject);
  },

  deleteUser: async (userID) => {
    await User.findByIdAndDelete(userID);
  }
};
