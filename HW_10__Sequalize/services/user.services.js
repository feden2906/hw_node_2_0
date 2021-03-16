const User = require('../models/User');
const { utils } = require('../helpers');
require('../models/Car');

module.exports = {
  findAllUsers: async (query = {}) => {
    const { filters, keys, params } = utils._basicQueryBuilder(query);
    const { limit, page, skip, sort } = params;

    const filterObject = {};

    keys.forEach((key) => {
      switch (key) {
        case 'yearBornGte':
          filterObject.yearBorn = Object.assign({}, filterObject.yearBorn, { $gte: filters.yearBornGte });
          break;
        case 'yearBornLte':
          filterObject.yearBorn = Object.assign({}, filterObject.yearBorn, { $lte: filters.yearBornLte });
          break;
        case 'category':
          const catArr = filters.category.split(';');
          filterObject.category = { $in: catArr };
          break;
        case 'name':
          filterObject.name = { $regex: filters.name, $options: 'i' };
          break;
        default:
          filterObject[key] = filters[key];
      }
    });

    const data = await User.find(filterObject).limit(limit).skip(skip).sort(sort);
    const count = await User.countDocuments(filterObject);

    return {
      data,
      page,
      limit,
      count,
      pages: Math.ceil(count / limit)
    };
  },

  findUserById: (userID) => User.findById(userID),

  findUser: (findObj) => User.findOne(findObj),

  createUser: (userObject) => User.create(userObject),

  updateUser: (userID, userObject) => User.findByIdAndUpdate(userID, { $set: userObject }),

  deleteUser: (userID) => User.findByIdAndDelete(userID)
};
