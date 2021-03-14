const User = require('../models/User');
require('../models/Car');

module.exports = {
  findAllUsers: (query = {}) => {
    const { limit = 10, page = 1, sortBy = 'createAt', order = 'asc', ...filters } = query;

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: order === 'asc' ? -1 : 1 };

    const keys = Object.keys(filters);
    const filterObject = {};

    keys.forEach((key) => {
      switch (key) {
        case 'yearBornGte':
          filterObject.yearBorn = Object.assign({}, filterObject.yearBorn, { $gte: filters.yearBornGte });
          break;
        case 'yearBornLte':
          filterObject.yearBorn = Object.assign({}, filterObject.yearBorn, { $lte: filters.yearBornLte });
          break;
        case 'name':
          filterObject.name = { $regex: filters.name, $options: 'i' };
          break;
        default:
          filterObject[key] = filters[key];
      }
    });

    return User.find(filterObject).limit(limit).skip(skip).sort(sort);
  },

  findUserById: (userID) => User.findById(userID),

  findUser: (findObj) => User.findOne(findObj),

  createUser: (userObject) => User.create(userObject),

  updateUser: (userID, userObject) => User.findByIdAndUpdate(userID, { $set: userObject }),

  deleteUser: (userID) => User.findByIdAndDelete(userID)
};
