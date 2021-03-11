const { ErrorHandler } = require('../helpers');
const { statusMessages, statusCodes } = require('../constants');
const {
  DOC_MIMETYPES,
  DOC_MAX_SIZE,
  PHOTO_MAX_SIZE,
  PHOTO_MIMETYPES,
  VIDEO_MAX_SIZE,
  VIDEO_MIMETYPES
} = require('../constants/constants');

module.exports = {
  checkFile: (req, res, next) => {
    try {
      const { files, query: { prefLang = 'en' } } = req;

      const docs = [];
      const photos = [];
      const videos = [];

      for (const key in files) {
        const { size, mimetype } = files[key];

        if (DOC_MIMETYPES.includes(mimetype)) { // DOC
          if (DOC_MAX_SIZE < size) {
            throw new ErrorHandler(statusMessages.FILE_TOO_BIG[prefLang], statusCodes.BAD_REQUEST);
          }

          docs.push(files[key]);
          continue;
        }

        if (PHOTO_MIMETYPES.includes(mimetype)) { // PHOTO
          if (PHOTO_MAX_SIZE < size) {
            throw new ErrorHandler(statusMessages.FILE_TOO_BIG[prefLang], statusCodes.BAD_REQUEST);
          }

          photos.push(files[key]);
          continue;
        }

        if (VIDEO_MIMETYPES.includes(mimetype)) { // VIDEO
          if (VIDEO_MAX_SIZE < size) {
            throw new ErrorHandler(statusMessages.FILE_TOO_BIG[prefLang], statusCodes.BAD_REQUEST);
          }

          videos.push(files[key]);
          continue;
        }

        throw new ErrorHandler(statusMessages.NOT_VALID_FILE[prefLang], statusCodes.BAD_REQUEST);
      }

      req.docs = docs;
      req.photos = photos;
      req.videos = videos;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkAvatar: (req, res, next) => {
    try {
      const { prefLang = 'en' } = req.query;

      if (req.photos.length > 1) {
        throw new ErrorHandler(statusMessages.JUST_ONE_PHOTO[prefLang], statusCodes.BAD_REQUEST);
      }

      [req.avatar] = req.photos;
      next();
    } catch (e) {
      next(e);
    }
  }
};
