const db = require('../dataBase').getInstance();

module.exports = {
  findUsers: (query) => {
    const User = db.getModel('User');

    return User.findAll({ where: query });
  },

  // findUserById: (userID) => User.findById(userID),
  //
  // findUser: (findObj) => User.findOne(findObj),
  //
  // createUser: (userObject) => User.create(userObject),
  //
  // updateUser: (userID, userObject) => User.findByIdAndUpdate(userID, { $set: userObject }),
  //
  // deleteUser: (userID) => User.findByIdAndDelete(userID)
};
