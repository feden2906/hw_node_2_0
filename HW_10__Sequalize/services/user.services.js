const db = require('../dataBase').getInstance();

const { USER } = require('../constants/modelNames.enum');

module.exports = {
  findUsers: (query) => {
    const User = db.getModel(USER);

    return User.findAll({ where: query });
  },

  findUserById: (userID) => {
    const User = db.getModel(USER);

    return User.findByPk(userID);
  },

  findUser: (findObj) => {
    const User = db.getModel(USER);

    return User.findOne({ where: findObj });
  },

  createUser: (userObject) => {
    const User = db.getModel(USER);

    return User.create(userObject);
  },

  updateUser: async (userID, userObject) => {
    const User = db.getModel(USER);

    await User.update(userObject, { where: { id: userID } });
  },

  deleteUser: async (userID) => {
    const User = db.getModel(USER);

    await User.destroy({ where: { id: userID } });
  }
};
