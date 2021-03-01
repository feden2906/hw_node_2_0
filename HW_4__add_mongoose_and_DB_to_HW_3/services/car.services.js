const Car = require('../dataBase/models/Car');

module.exports = {
  findAllCars: () => Car.find(),

  CarById: (userID) => Car.findById(userID),

  createCar: (carObject) => Car.create(carObject),

  deleteCar: (carID) => Car.findByIdAndDelete(carID)
};
