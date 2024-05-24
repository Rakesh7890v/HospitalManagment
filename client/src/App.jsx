import { Route, Routes } from 'react-router-dom'
import './App.css'
import Appointment from './Appointment'
import Header from './Header'
import Patient from './Patient'
import { useState } from 'react'
import Doctor from './Doctor'

function App() {
  
  const [successMessage, setSuccessMessage] = useState(false);

  return (
    <>
      <div className='home-container'>
        <Header successMessage={successMessage}/>
        <Routes>
          <Route path='/' element={<Appointment setSuccessMessage={setSuccessMessage}/>}/>
          <Route path='/patient' element={<Patient setSuccessMessage={setSuccessMessage}/>}/>
          <Route path='/doctor' element={<Doctor setSuccessMessage={setSuccessMessage}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
