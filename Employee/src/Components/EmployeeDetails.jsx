import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState([])
  const navigate = useNavigate()
    const {id} = useParams()
    useEffect(() => {
        axios.get('http://localhost:3000/employee/details/'+id)
        .then(result => {
          setEmployee(result.data.Result[0])
        })
        .catch(err => console.log(err))
    }, [])
    axios.defaults.withCredentials = true;
    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
        .then(result => {
          if(result.data.Status)
          {
            localStorage.removeItem('valid')
            navigate('/')
          }
        })
        .catch(err => console.log(err))
    }
  return (
    <div>
      <div className='p-2 d-flex justify-content-center shadow'>
          <h3>Employee Management System</h3>
      </div>
      <div className='d-flex justify-content-center mt-5'>
          <div className='d-flex justify-content-center flex-column align-items-center w-50 shadow'>
              <div className='d-flex align-items-center flex-column mt-5 '>
                  <h3>{employee.name}</h3>
                  <h3>{employee.email}</h3>
                  <h3>{employee.category}</h3>
                  <h3>${employee.salary}</h3>
              </div>
              <div className='mb-5'>
                <button className='btn btn-secondary me-2'>Edit</button>
                <button className='btn me-2 btn-dark' onClick={handleLogout}>Logout</button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default EmployeeDetails