const mongoose = require('mongoose')

const DocterSchema = new mongoose.Schema({
    doctor: String,
    salary: String,
    join: String
})

const DocterModel = mongoose.model('doctor', DocterSchema)
module.exports = DocterModel;