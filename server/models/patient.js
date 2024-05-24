const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    patient: String,
    age: String, 
    mobile: String
})

const PatientModel = mongoose.model('patient', PatientSchema)
module.exports = PatientModel;