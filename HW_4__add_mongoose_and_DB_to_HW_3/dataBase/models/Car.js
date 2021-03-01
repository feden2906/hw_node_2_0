const { Schema, model } = require('mongoose');

const carSchema = new Schema({
  model: { type: String, required: true },
  price: { type: Number },
  year: { type: Number }
});

module.exports = model('Car', carSchema);
