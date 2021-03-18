const db = require('../dataBase').getInstance();

module.exports = {
  findUsers: (query) => {
    const User = db.getModel('User');

    return User.findAll({ where: query });
  },

  findUserById: (userID) => {
    const User = db.getModel('User');

    return User.findByPk(userID);
  },

  findUser: (findObj) => {
    const User = db.getModel('User');

    return User.findOne({ where: findObj });
  },

  createUser: (userObject) => {
    const User = db.getModel('User');

    return User.create(userObject);
  },

  updateUser: async (userID, userObject) => {
    const User = db.getModel('User');

    await User.update(userObject, { where: { id: userID } });
  },

  // deleteUser: (userID) => User.findByIdAndDelete(userID)
};
