// const { Schema, model } = require('mongoose');
//
// const { dataBaseTable: { USER, CAR } } = require('../constants');
//
// const userSchema = new Schema({
//   avatar: { type: String },
//   docs: [{ type: String }],
//   videos: [{ type: String }],
//   name: { type: String, required: true },
//   password: { type: String, required: true, select: false },
//   email: { type: String, required: true },
//   phone: { type: String },
//   yearBorn: { type: Number },
//   isMarried: { type: Boolean, required: true },
//   gender: { type: String, required: true },
//   cars: [{ type: Schema.Types.ObjectId }]
// }, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });
//
// userSchema.virtual('userCars', {
//   ref: CAR,
//   localField: 'cars',
//   foreignField: '_id',
// });
//
// userSchema
//     .pre('find', function() {
//       this.populate('userCars');
//     })
//     .pre('findOne', function() {
//       this.populate('userCars');
//     });
//
// module.exports = model(USER, userSchema);
