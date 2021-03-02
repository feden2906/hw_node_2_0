const { Schema, model } = require('mongoose');

const { dataBaseTable: { CAR } } = require('../constants');

const carSchema = new Schema({
  producer: { type: String },
  model: { type: String },
  price: { type: Number },
  year: { type: Number }
});

module.exports = model(CAR, carSchema);
