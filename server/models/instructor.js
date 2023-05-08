const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    name: String,
    age: Number,
});

module.exports = mongoose.model('Instructor', instructorSchema);
