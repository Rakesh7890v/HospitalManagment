const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const AppointmentModel = require('./models/appointment')
const PatientModel = require('./models/patient')
const DoctorModel = require('./models/doctor')

const app = express()

const allowedOrigins = ['https://hospital-managments.vercel.app'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json())
const port = 3400;
mongoose.connect("mongodb+srv://hospital_manag:t4sPYoOPpzhcJUJv@hospital.1fo7856.mongodb.net/?retryWrites=true&w=majority&appName=hospital")

app.get('/',(req, res) => {
    res.json("Hello");
})

app.get('/adata', (req, res) => {
    AppointmentModel.find({})
    .then(adata => res.json(adata))
    .catch(err => res.json(err))
})

app.post('/create', (req, res) => {
    AppointmentModel.create(req.body)
    .then(blogs => res.json(blogs))
    .catch(err => res.json(err))
})

// Appointment 
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { pname, dname, date } = req.body;
    AppointmentModel.findByIdAndUpdate(id, { pname, dname, date }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    AppointmentModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

//Patient 
app.get('/pdata', (req, res) => {
    PatientModel.find({})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
app.post('/patient', (req,res) => {
    PatientModel.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/pupdate/:id', (req, res) => {
    const { id } = req.params;
    const { patient, age, mobile } = req.body;
    PatientModel.findByIdAndUpdate(id, { patient, age, mobile }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.delete('/pdelete/:id', (req, res) => {
    const { id } = req.params;
    PatientModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

//Docter
app.get('/ddata', (req, res) => {
    DoctorModel.find({})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
app.post('/doctor', (req,res) => {
    DoctorModel.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/dupdate/:id', (req, res) => {
    const { id } = req.params;
    const { doctor, salary, join } = req.body;
    DoctorModel.findByIdAndUpdate(id, { doctor, salary, join }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.delete('/ddelete/:id', (req, res) => {
    const { id } = req.params;
    DoctorModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});
