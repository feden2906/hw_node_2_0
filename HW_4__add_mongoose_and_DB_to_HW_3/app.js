const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./routers/api.routers');

const app = express();

// eslint-disable-next-line no-use-before-define
_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRouter);

app.listen(5000, () => {
  console.log('server started');
});

function _connectDB() {
  mongoose.connect('mongodb://localhost:27017/users_cars', { useNewUrlParser: true, useUnifiedTopology: true });

  const { connection } = mongoose;

  connection.on('error', (error) => {
    if (error) {
      console.log(error);
    }
  });
}
