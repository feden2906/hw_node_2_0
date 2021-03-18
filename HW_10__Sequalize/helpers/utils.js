const path = require('path');
const fs = require('fs-extra').promises;
const uuid = require('uuid').v1;

const { authService } = require('../services');
const tokenizer = require('./tokenizer');

const _filesDirBuilder = (docName, itemID, itemClass, itemType) => {
  const pathWithoutPublic = path.join(itemClass, itemID, itemType);
  const fullDirPath = path.join(process.cwd(), 'public', pathWithoutPublic);
  const fileExtension = path.extname(docName);
  const fileName = uuid() + fileExtension;
  const finalPath = path.join(fullDirPath, fileName);
  const pathForDB = path.join(pathWithoutPublic, fileName);

  return { finalPath, pathForDB, fullDirPath };
};

const _filesListSaver = async (filesArr, itemID, itemClass, itemType) => {
  const pathArr = [];

  for (const value of filesArr) {
    const { finalPath, pathForDB, fullDirPath } = _filesDirBuilder(value.name, itemID, itemClass, itemType);

    await fs.mkdir(fullDirPath, { recursive: true });

    await value.mv(finalPath);

    pathArr.push(pathForDB);
  }

  return pathArr;
};

const _basicQueryBuilder = (query) => {
  const {
    limit = 10, page = 1, sortBy = 'createAt', order = 'asc', ...filters
  } = query;

  const skip = (page - 1) * limit;
  const orderBy = order === 'asc' ? -1 : 1;
  const sort = { [sortBy]: orderBy };

  const keys = Object.keys(filters);

  return {
    filters,
    keys,
    params: {
      limit, page, sort, skip
    }
  };
};

const _saveTokensToBD = async (userID) => {
  const tokens = tokenizer();

  await authService.deleteTokens(userID);

  await authService.saveTokenToBD({ ...tokens, userID });

  return tokens;
};

module.exports = {
  _basicQueryBuilder,
  _filesDirBuilder,
  _filesListSaver,
  _saveTokensToBD
};
