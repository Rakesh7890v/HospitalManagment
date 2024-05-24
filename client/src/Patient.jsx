import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Patient = ({setSuccessMessage}) => {
  const [patient, setPatient] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [editId, setEditId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3400/pdata')
      .then(result => {
        console.log(result);
        setData(result.data);
        setCount(result.data.length);
      })
      .catch(err => console.log(err));
  };

  const Create = (e) => {
    e.preventDefault();
    if (patient.trim() === "" || age.trim() === "" || mobile.trim() === ""){
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      },2000);
    } 
    else if (editId) {
      axios.put(`http://localhost:3400/pupdate/${editId}`, { patient, age, mobile })
        .then(result => {
          console.log(result.data);
          fetchData();
          clearForm();
        })
        .catch(err => console.log(err));
    } else {
      axios.post('http://localhost:3400/patient', { patient, age, mobile })
        .then(result => {
          console.log(result.data);
          fetchData();
          clearForm();
        })
        .catch(err => console.log(err));
    }
  };

  const DataEdit = (id) => {
    const user = data.find(dat => dat._id === id);
    setPatient(user.patient);
    setAge(user.age);
    setMobile(user.mobile);
    setEditId(id);
  };

  const DataDelete = (id) => {
    axios.delete(`http://localhost:3400/pdelete/${id}`)
      .then(result => {
        console.log(result.data);
        fetchData();
      })
      .catch(err => console.log(err));
  };

  const clearForm = () => {
    setPatient('');
    setAge('');
    setMobile('');
    setEditId(null);
  };

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
              <input type="text" placeholder='Enter Patient Name' value={patient} onChange={(e) => setPatient(e.target.value)} />
            </div>
            <div className='inputs'>
              Age
              <input type="text" placeholder='Enter Patient Age' value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className='inputs'>
              Mobile
              <input type="text" placeholder='Enter Mobile Number' value={mobile} onChange={(e) => setMobile(e.target.value)} maxLength={10}/>
            </div>
            {showMessage && <p style={{color: 'red'}}>* All fields are required.</p>}
            <div className='inputs'>
              <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </form>

          <div className="right-side">
            <h1>{`Patients (${count})`}</h1>
            {Array.isArray(data) ? (
              data.map(dat => (
                <div className="datas" key={dat._id}>
                  <hr></hr>
                  <div className="details">
                    <div className="left">
                      <p>Patient Name: {dat.patient}</p>
                      <p>Age: {dat.age}</p>
                      <p>Mobile: {dat.mobile}</p>
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
    </div>
  );
}

export default Patient;
