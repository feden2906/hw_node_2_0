const router = require('express').Router();

const { carControllers } = require('../controllers');
const { mwCar, mwFile } = require('../middlewares');

router.route('/')
    .get(carControllers.getAllCars)
    .post(mwCar.isModelVal, mwFile.checkFile, carControllers.createCar);

router.route('/:carID')
    .get(carControllers.getCarById)
    .delete(carControllers.deleteCar);

module.exports = router;
