const User = require('../models/User');
require('../models/Car');

module.exports = {
  findAllUsers: () => User.find(),

  findUserById: (userID) => User.findById(userID),

  createUser: (userObject) => User.create(userObject),

  updateUser: (userID, userObject) => User.findByIdAndUpdate(userID, userObject),

  deleteUser: (userID) => User.findByIdAndDelete(userID)
};
