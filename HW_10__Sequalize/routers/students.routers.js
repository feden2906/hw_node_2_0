const router = require('express').Router();

const { studentControllers } = require('../controllers');
// const { mwCar, mwFile, mwUrl } = require('../middlewares');

router.route('/')
    .get(
        // mwUrl.checkCarQuery,
        studentControllers.getStudents)

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
