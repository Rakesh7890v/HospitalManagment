import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Doctor = ({setSuccessMessage}) => {

    const [doctor, setDoctor] = useState('');
    const [salary, setSalary] = useState('');
    const [join, setJoin] = useState('');
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [editId, setEditId] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      axios.get('http://localhost:3400/ddata')
      .then(result => {
        console.log(result)
        setData(result.data);
        setCount(result.data.length);
      })
      .catch(err => console.log(err));
    }
  
    const Create = (e) => {
      e.preventDefault();
      if (doctor.trim() === "" || salary.trim() === "" || join.trim() === ""){
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        },2000);
      } else if (editId) {
        axios.put(`http://localhost:3400/dupdate/${editId}`, { doctor, salary, join })
        .then(result => {
          console.log(result.data);
          fetchData();
          setEditId(null);
          clearForm();
        })
        .catch(err => console.log(err));
      } else {
        axios.post('http://localhost:3400/doctor', { doctor, salary, join })
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
      setDoctor(user.doctor);
      setSalary(user.salary);
      setJoin(user.join);
      setEditId(id);
    }
  
    const DataDelete = (id) => {
      axios.delete(`http://localhost:3400/ddelete/${id}`)
      .then(result => {
        console.log(result.data);
        fetchData();
      })
      .catch(err => console.log(err));
    }
  
    const clearForm = () => {
      setDoctor('');
      setSalary('');
      setJoin('');
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
                Doctor Name
                <input type="text" placeholder='Enter Doctor Name' value={doctor} onChange={(e) => setDoctor(e.target.value)} />
              </div>
              <div className='inputs'>
                Salary
                <input type="text" placeholder='Enter Salary' value={salary} onChange={(e) => setSalary(e.target.value)} />
              </div>
              <div className='inputs'>
                Joining Date
                <input type="date" value={join} onChange={(e) => setJoin(e.target.value)} />
              </div>
              {showMessage && <p style={{color: 'red'}}>* All fields are required.</p>}
              <div className='inputs'>
                <button type="submit" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
  
            <div className="right-side">
              <h1>{`Doctors (${count})`}</h1>
              {Array.isArray(data) ? (
                data.map(dat => (
                  <div className="datas" key={dat._id}>
                    <hr />
                    <div className="details">
                      <div className="left">
                        <p>Doctor Name: {dat.doctor}</p>
                        <p>Salary: {dat.salary}</p>
                        <p>Joining Date: {dat.join}</p>
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
    )
}

export default Doctor