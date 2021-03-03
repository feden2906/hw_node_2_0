const router = require('express').Router();

const { carControllers } = require('../controllers');
const { mwCar } = require('../middlewares');

router.route('/')
    .get(carControllers.getAllCars)
    .post(mwCar.isModelVal, carControllers.createCar);

router.route('/:carID')
    .get(carControllers.getCarById)
    .delete(carControllers.deleteCar);

module.exports = router;
