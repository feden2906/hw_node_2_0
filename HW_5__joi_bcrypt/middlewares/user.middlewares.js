// const { statusMessages, statusCodes } = require('../constants');
// const { userValidators } = require('../validators');

module.exports = {
  isUserVal: (req, res, next) => {
    try {
      userValidators.createUserValidator;
      // const { body: { name }, query: { prefLang = 'en' } } = req;
      //
      // if (!name) {
      //   throw new Error(statusMessages.NAME_IS_EMPTY[prefLang]);
      // }
      //
      // if (!Number.isNaN(+name)) {
      //   throw new Error(statusMessages.NOT_VALID_USERNAME[prefLang]);
      // }

      next();
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },
//
//   isPassVal: (req, res, next) => {
//     try {
//       const { body: { password }, query: { prefLang = 'en' } } = req;
//
//       next();
//     } catch (e) {
//       res.status(statusCodes.BAD_REQUEST).json(e.message);
//     }
//   },
//
//   isEmailVal: (req, res, next) => {
//     try {
//       const { body: { email }, query: { prefLang = 'en' } } = req;
//
//       if (!email) {
//         throw new Error(statusMessages.PASSWORD_IS_EMPTY[prefLang]);
//       }
//
//       if (!email.includes('@')) {
//         throw new Error(statusMessages.NOT_VALID_EMAIL[prefLang]);
//       }
//
//       next();
//     } catch (e) {
//       res.status(statusCodes.BAD_REQUEST).json(e.message);
//     }
//   },
//
//   isAgeVal: (req, res, next) => {
//     try {
//       const { body: { age }, query: { prefLang = 'en' } } = req;
//
//       if (!age) {
//         throw new Error(statusMessages.AGE_IS_EMPTY[prefLang]);
//       }
//
//       if (age < 18) {
//         throw new Error(statusMessages.AGE_TOO_SMALL[prefLang]);
//       }
//
//       next();
//     } catch (e) {
//       res.status(statusCodes.BAD_REQUEST).json(e.message);
//     }
//   },
//
//   isIdVal: (req, res, next) => {
//     try {
//       const { params: { userID }, query: { prefLang = 'en' } } = req;
//
//       if (userID > 24 || userID < 24) {
//         throw new Error(statusMessages.NOT_VALID_ID[prefLang]);
//       }
//
//       next();
//     } catch (e) {
//       res.status(statusCodes.BAD_REQUEST).json(e.message);
//     }
//   },
};
