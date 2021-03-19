// const { carService } = require('../services');
// const { directoryName: { CARS, DOCS, PHOTOS, VIDEOS }, statusCodes, statusMessages } = require('../constants');
// const { utils } = require('../helpers');

// module.exports = {
// getCars: async (req, res, next) => {
//   try {
//     const cars = await carService.findCars(req.query);
//
//     res.json(cars);
//   } catch (e) {
//     next(e);
//   }
// },

// getCarById: async (req, res, next) => {
//   try {
//     const { params: { carID }, query: { prefLang = 'en' } } = req;
//
//     const car = await carService.CarById(carID, prefLang);
//
//     res.json(car);
//   } catch (e) {
//     next(e);
//   }
// },
//
// createCar: async (req, res, next) => {
//   try {
//     const { docs, photos, videos, body, query: { prefLang = 'en' } } = req;
//
//     const car = await carService.createCar(body, prefLang);
//     const itemID = car._id.toString();
//
//     if (photos.length) {
//       const pathArr = await utils._filesListSaver(photos, itemID, CARS, PHOTOS);
//       await carService.updateCar(itemID, { photos: pathArr });
//     }
//
//     if (docs.length) {
//       const pathArr = await utils._filesListSaver(docs, itemID, CARS, DOCS);
//       await carService.updateCar(itemID, { docs: pathArr });
//     }
//
//     if (videos.length) {
//       const pathArr = await utils._filesListSaver(videos, itemID, CARS, VIDEOS);
//       await carService.updateCar(itemID, { videos: pathArr });
//     }
//
//     res.status(statusCodes.CREATED).json(statusMessages.CAR_IS_CREATED[prefLang]);
//   } catch (e) {
//     next(e);
//   }
// },
//
// deleteCar: async (req, res, next) => {
//   try {
//     const { params: { carID }, query: { prefLang = 'en' } } = req;
//
//     await carService.deleteCar(carID);
//
//     res.json(statusMessages.CAR_WAS_DELETED[prefLang]);
//   } catch (e) {
//     next(e);
//   }
// }
// };
