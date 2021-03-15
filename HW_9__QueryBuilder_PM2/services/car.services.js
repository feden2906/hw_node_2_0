const Car = require('../models/Car');
const { utils } = require('../helpers');

module.exports = {
  findAllCars: async (query = {}) => {
    const { filters, keys, params } = utils._basicQueryBuilder(query);
    const { limit, page, skip, sort } = params;

    const filterObject = {};

    keys.forEach((key) => {
      switch (key) {
        case 'yearGte':
          filterObject.year = Object.assign({}, filterObject.year, { $gte: filters[key] });
          break;
        case 'yearLte':
          filterObject.year = Object.assign({}, filterObject.year, { $lte: filters[key] });
          break;
        case 'priceGte':
          filterObject.price = Object.assign({}, filterObject.price, { $gte: filters[key] });
          break;
        case 'priceLte':
          filterObject.price = Object.assign({}, filterObject.price, { $lte: filters[key] });
          break;
        case 'producer':
          const producersArr = filters[key].split(';');
          filterObject.producer = { $in: producersArr };
          break;
        case 'model':
          filterObject.model = { $regex: filters[key], $options: 'i' };
          break;
        default:
          filterObject[key] = filters[key];
      }
    });

    const data = await Car.find(filterObject).limit(limit).skip(skip).sort(sort);
    const count = await Car.countDocuments(filterObject);

    return {
      data,
      page,
      limit,
      count,
      pages: Math.ceil(count / limit)
    };
  },

  CarById: (userID) => Car.findById(userID),

  createCar: (carObject) => Car.create(carObject),

  updateCar: (carID, carObject) => Car.findByIdAndUpdate(carID, { $set: carObject }),

  deleteCar: (carID) => Car.findByIdAndDelete(carID)
};
