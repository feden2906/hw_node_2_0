const router = require('express').Router();

const { carControllers } = require('../controllers');
const { mwCar } = require('../middlewares');

router.get('/', carControllers.getAllCars);
router.post('/', mwCar.isModelVal, carControllers.createCar);

router.get('/:carID', mwCar.isIdVal, carControllers.getCarById);
router.delete('/:carID', mwCar.isIdVal, carControllers.deleteCar);

module.exports = router;
