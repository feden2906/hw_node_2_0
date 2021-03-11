const { carService } = require('../services');
const { statusCodes, statusMessages } = require('../constants');

module.exports = {
  getAllCars: async (req, res, next) => {
    try {
      const { prefLang = 'en' } = req.query;

      const cars = await carService.findAllCars(prefLang);

      res.json(cars);
    } catch (e) {
      next(e);
    }
  },

  getCarById: async (req, res, next) => {
    try {
      const { params: { carID }, query: { prefLang = 'en' } } = req;

      const car = await carService.CarById(carID, prefLang);

      res.json(car);
    } catch (e) {
      next(e);
    }
  },

  createCar: async (req, res, next) => {
    try {
      const { body, query: { prefLang = 'en' } } = req;

      await carService.createCar(body, prefLang);

      res.status(statusCodes.CREATED).json(statusMessages.CAR_IS_CREATED[prefLang]);
    } catch (e) {
      next(e);
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      const { params: { carID }, query: { prefLang = 'en' } } = req;

      await carService.deleteCar(carID);

      res.json(statusMessages.CAR_WAS_DELETED[prefLang]);
    } catch (e) {
      next(e);
    }
  }
};
