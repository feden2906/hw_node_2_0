const router = require('express').Router();

const { carControllers } = require('../controllers');
const { mwCar, mwFile, mwUrl } = require('../middlewares');

router.route('/')
    .get(
        mwUrl.checkCarQuery,
        carControllers.getCars)

//     .post(mwUrl.disableQuery,
//       mwCar.isModelVal,
//       mwFile.checkFile,
//         studentControllers.createCar);
//
// router.route('/:carID')
//     .get(mwUrl.disableQuery,
//         studentControllers.getCarById)
//
//     .delete(mwUrl.disableQuery,
//         studentControllers.deleteCar);

module.exports = router;
