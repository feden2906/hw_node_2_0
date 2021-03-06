const Car = require('../models/Car');

module.exports = {
  findAllCars: () => Car.find(),

  CarById: (userID) => Car.findById(userID),

  createCar: (carObject) => Car.create(carObject),

  updateCar: (carID, carObject) => Car.findByIdAndUpdate(carID, { $set: carObject }),

  deleteCar: (carID) => Car.findByIdAndDelete(carID)
};
