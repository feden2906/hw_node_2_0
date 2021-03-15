const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const { apiRouter } = require('./routers');
const { config: { PORT, MONGO_URL } } = require('./configs');

const app = express();

console.log(process.env);
_connectDB();

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

function _connectDB() {
  mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  const { connection } = mongoose;

  connection.on('error', (error) => {
    if (error) {
      console.error(error);
    }
  });
}
