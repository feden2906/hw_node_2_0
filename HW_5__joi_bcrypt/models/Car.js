const { Schema, model } = require('mongoose');

const carSchema = new Schema({
  producer: { type: String },
  model: { type: String },
  price: { type: Number },
  year: { type: Number }
});

module.exports = model('Car', carSchema);
