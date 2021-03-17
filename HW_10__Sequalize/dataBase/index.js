const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

module.exports = (() => {
  let instance;

  const initConnection = () => {
    const client = new Sequelize('users-cars', 'root', 'root', { dialect: 'mysql' });

    const models = {};
    const modelsPath = path.join(process.cwd(), 'dataBase', 'models');

    const getModels = () => {
      fs.readdir(modelsPath, ((err, files) => {
        files.forEach((file) => {
          const { name } = path.parse(file);

          const modelFile = require(path.join(modelsPath, name));

          models[name] = modelFile(client);
        });
      }));
    };

    return {
      setModels: () => getModels(),
      getModel: (modelName) => models[modelName]
    };
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = initConnection();
      }

      return instance;
    }
  };
})();
