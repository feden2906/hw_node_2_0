const User = require('../dataBase/models/User');
require('../dataBase/models/Car');

module.exports = {
  findAllUsers: () =>  User.find(),

  findUserById: (userID) =>  User.findById(userID),

  createUser: (userObject) => User.create(userObject),

  deleteUser: (userID) => User.findByIdAndDelete(userID)
};
