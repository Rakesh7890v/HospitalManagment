const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    pname: String,
    dname: String,
    date: String
})

const AppointmentModel = mongoose.model('appointment', AppointmentSchema)
module.exports = AppointmentModel