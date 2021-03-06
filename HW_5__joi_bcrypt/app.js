const express = require('express');
const mongoose = require('mongoose');

const { apiRouter } = require('./routers');
const { config: { PORT, MONGO_URL } } = require('./configs');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRouter);

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
