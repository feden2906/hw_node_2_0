const router = require('express').Router();

const { carControllers } = require('../controllers');
const { mwCar, mwUrl } = require('../middlewares');

router.route('/')
    .get(carControllers.getAllCars)
    .post(mwCar.isModelVal, carControllers.createCar);

router.route('/:carID')
    .get(mwUrl.isIdVal, carControllers.getCarById)
    .delete(mwUrl.isIdVal, carControllers.deleteCar);



module.exports = router;
