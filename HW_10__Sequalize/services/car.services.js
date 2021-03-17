const db = require('../dataBase').getInstance();

module.exports = {
  findCars: (query) => {
    const Car = db.getModel('Car');

    return Car.findAll({ where: query });
  }

// CarById: (userID) => Car.findById(userID),
// createCar: (carObject) => Car.create(carObject),
// updateCar: (carID, carObject) => Car.findByIdAndUpdate(carID, { $set: carObject }),
// deleteCar: (carID) => Car.findByIdAndDelete(carID)
};
