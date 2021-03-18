const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const db = require('./dataBase').getInstance();

require('dotenv').config();

db.setModels();

const { apiRouter } = require('./routers');
const { PORT } = require('./configs/configs');

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', apiRouter);

app.use('*', (err, req, res, next) => {
  res
      .status(err.status)
      .json({ text: err.message });
});

app.listen(PORT, () => {
  console.log(`server started to ${PORT}`);
});
