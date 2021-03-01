const Car = require('../dataBase/models/Car');
const statusMessages = require('../constants/statusMessages');

module.exports = {
  findAllCars: async (prefLang) => {
    const cars = await Car.find();

    if (cars) {
      return cars;
    }

    throw new Error(statusMessages.CARS_NOT_FOUND[prefLang]);
  },

  CarById: async (userID, prefLang) => {
    const user = await Car.findById(userID);

    if (user) {
      return user;
    }

    throw new Error(statusMessages.CAR_NOT_FOUND[prefLang]);
  },

  createCar: async (carObject) => {
    await Car.create(carObject);
  },

  deleteCar: async (carID) => {
    await Car.findByIdAndDelete(carID);
  }
};
