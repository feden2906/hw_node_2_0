const carService = require('../services/car.services');
const statusCodes = require('../constants/statusCodes.enum');
const statusMessages = require('../constants/statusMessages');

module.exports = {
  getAllCars: async (req, res) => {
    try {
      const { prefLang = 'en' } = req.query;

      const cars = await carService.findAllCars(prefLang);

      res.json(cars);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  getCarById: async (req, res) => {
    try {
      const { params: { carID }, query: { prefLang = 'en' } } = req;

      const car = await carService.CarById(carID, prefLang);

      res.json(car);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  createCar: async (req, res) => {
    try {
      const { body, query: { prefLang = 'en' } } = req;

      await carService.createCar(body, prefLang);

      res.status(statusCodes.CREATED).json(statusMessages.CAR_IS_CREATED[prefLang]);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  deleteCar: async (req, res) => {
    try {
      const { params: { carID }, query: { prefLang = 'en' } } = req;

      await carService.deleteCar(carID);

      res.json(statusMessages.CAR_WAS_DELETED[prefLang]);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
};
