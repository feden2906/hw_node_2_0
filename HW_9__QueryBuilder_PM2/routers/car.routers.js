const router = require('express').Router();

const { carControllers } = require('../controllers');
const { mwCar, mwFile, mwUrl } = require('../middlewares');

router.route('/')
    .get(mwUrl.checkCarQuery,
      carControllers.getAllCars)

    .post(mwUrl.checkCarQuery,
      mwCar.isModelVal,
      mwFile.checkFile,
      carControllers.createCar);

router.route('/:carID')
    .get(mwUrl.checkCarQuery,
      carControllers.getCarById)

    .delete(mwUrl.checkCarQuery,
      carControllers.deleteCar);

module.exports = router;
