import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Appointment = ({ setSuccessMessage }) => {

  const [pname, setPname] = useState('');
  const [dname, setDname] = useState('');
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [count, setCount] = useState(0);
  const [editId, setEditId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchData();
    fetchDoctor();
  }, []);

  const fetchData = () => {
    axios.get('https://hospital-managment-api-chi.vercel.app/adata')
    .then(result => {
      const sortedData = result.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      const today = new Date();
      sortedData.forEach(appointment => {
        const appointmentDate = new Date(appointment.date);
        const timeDiff = appointmentDate - today;
        appointment.daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        if(appointment.daysRemaining < 0) {
          DataDelete(appointment._id)
        }
      });
      setData(sortedData);
      setCount(sortedData.length);
    })
    .catch(err => console.log(err));
  }

  const fetchDoctor = () => {
    axios.get('https://hospital-managment-api-chi.vercel.app/ddata')
    .then(result => {
      console.log(result)
      setDoctor(result.data);
    })
    .catch(err => console.log(err));
  }

  const Create = (e) => {
    e.preventDefault();
    if (pname.trim() === "" || dname.trim() === "" || date.trim() === ""){
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      },2000);
    } else if (editId) {
      axios.put(`https://hospital-managment-api-chi.vercel.app/update/${editId}`, { pname, dname, date })
      .then(result => {
        console.log(result.data);
        fetchData();
        setEditId(null);
        clearForm();
      })
      .catch(err => console.log(err));
    } else {
      axios.post('https://hospital-managment-api-chi.vercel.app/create', { pname, dname, date })
      .then(result => {
        console.log(result.data);
        fetchData();
        clearForm();
      })
      .catch(err => console.log(err));
    }
  }

  const DataEdit = (id) => {
    const user = data.find(dat => dat._id === id);
    setPname(user.pname);
    setDname(user.dname);
    setDate(user.date);
    setEditId(id);
  }

  const DataDelete = (id) => {
    axios.delete(`https://hospital-managment-api-chi.vercel.app/delete/${id}`)
    .then(result => {
      console.log(result.data);
      fetchData();
    })
    .catch(err => console.log(err));
  }

  const clearForm = () => {
    setPname('');
    setDname('');
    setDate('');
  }
  const handleSubmit = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    },2000)
  }

  return (
    <div>
      <div className="appointment-container">
        <div className="appointment">

          <form className="left-side" onSubmit={Create}>
            <div className='inputs'>
              Patient Name
              <input type="text" placeholder='Enter Patient Name' value={pname} onChange={(e) => setPname(e.target.value)} />
            </div>
            <div className='inputs'>
              Docter Name
              <input type="text" placeholder='Enter Doctor Name' value={dname} onChange={(e) => setDname(e.target.value)} list='doct'/>
            </div>
            <div className='inputs'>
              Date
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            {showMessage && <p style={{color: 'red'}}>* All fields are required.</p>}
            <div className='inputs'>
              <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </form>

          <div className="right-side">
            <h1>{`Appointments (${count})`}</h1>
            {Array.isArray(data) ? (
              data.map(dat => (
                <div className="datas" key={dat._id}>
                  <hr />
                  <div className="details">
                    <div className="left">
                      <p>Patient Name: {dat.pname}</p>
                      <p>Doctor Name: {dat.dname}</p>
                      <p>Date: {dat.date}</p>
                      <p>Remaining Days: {dat.daysRemaining}</p>
                    </div>
                    <div className="right">
                      <FontAwesomeIcon icon={faEdit} className='icon1' onClick={() => DataEdit(dat._id)} />
                      <FontAwesomeIcon icon={faTrash} className='icon2' onClick={() => DataDelete(dat._id)} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
        <datalist id='doct'>
        {doctor.map(doct => (
          <option value={doct.doctor} key={doct._id}>{doct.doctor}</option>
        ))}
        </datalist>
    </div>
  )
}

export default Appointment;
