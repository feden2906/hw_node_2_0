const Car = require('../models/Car');

module.exports = {
  findAllCars: (query = {}) => {
    const { limit = 10, page = 1, sortBy = 'createAt', order = 'asc', ...filters } = query;

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: order === 'asc' ? -1 : 1 };

    const keys = Object.keys(filters);
    const filterObject = {};

    keys.forEach((key) => {
      switch (key) {
        case 'yearGte':
          filterObject.year = Object.assign({}, filterObject.year, { $gte: filters[key] })
          break;
        case 'yearLte':
          filterObject.year = Object.assign({}, filterObject.year, { $lte: filters[key] })
          break;
        case 'priceGte':
          filterObject.price = Object.assign({}, filterObject.price, { $gte: filters[key] })
          break;
        case 'priceLte':
          filterObject.price = Object.assign({}, filterObject.price, { $lte: filters[key] })
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

    return Car.find(filterObject).limit(limit).skip(skip).sort(sort);
  },

  CarById: (userID) => Car.findById(userID),

  createCar: (carObject) => Car.create(carObject),

  updateCar: (carID, carObject) => Car.findByIdAndUpdate(carID, { $set: carObject }),

  deleteCar: (carID) => Car.findByIdAndDelete(carID)
};
