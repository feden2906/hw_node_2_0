const { Schema, model } = require('mongoose');

const { dataBaseTable: { CAR } } = require('../constants');

const carSchema = new Schema({
  year: { type: Number },
  model: { type: String },
  owner: { type: Number },
  price: { type: Number },
  producer: { type: String },
  docs: [],
  videos: [],
  photos: []
});

module.exports = model(CAR, carSchema);
