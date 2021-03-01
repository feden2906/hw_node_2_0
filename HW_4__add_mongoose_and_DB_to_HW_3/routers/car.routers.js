const router = require('express').Router();

const carControllers = require('../controllers/car.controllers');
const mw = require('../middlewares/car.middlewares');

router.get('/', carControllers.getAllCars);
router.post('/', mw.isModelVal, carControllers.createCar);

router.get('/:carID', mw.isIdVal, carControllers.getCarById);
router.delete('/:carID', mw.isIdVal, carControllers.deleteCar);

module.exports = router;
