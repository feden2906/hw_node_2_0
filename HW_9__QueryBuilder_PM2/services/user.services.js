const User = require('../models/User');
require('../models/Car');

module.exports = {
  findAllUsers: (rest) => User.find(rest),

  findUserById: (userID) => User.findById(userID),

  findUser: (findObj) => User.findOne(findObj),

  createUser: (userObject) => User.create(userObject),

  updateUser: (userID, userObject) => User.findByIdAndUpdate(userID, { $set: userObject }),

  deleteUser: (userID) => User.findByIdAndDelete(userID)
};
