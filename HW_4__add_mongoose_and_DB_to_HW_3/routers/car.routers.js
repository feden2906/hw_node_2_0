const router = require('express').Router();

const carControllers = require('../controllers/car.controllers');

router.get('/', carControllers.getAllCars);
router.post('/', carControllers.createCar);

router.get('/:carID', carControllers.getCarById);
router.delete('/:carID', carControllers.deleteCar);

module.exports = router;
