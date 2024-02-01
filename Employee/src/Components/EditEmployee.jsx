import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const {id} = useParams()
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate= useNavigate()
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: "",
      });
      useEffect(() => {
        axios.get("http://localhost:3000/auth/category")
            .then(result => {
                if(result.data.Status)
                {
                    setCategory(result.data.Result)
                }
                else
                {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))

            axios.get('http://localhost:3000/auth/employee/'+id)
            .then(result => {
                const employeeData = result.data.Result[0]
                setEmployee({
                    ...employee,
                    name: employeeData.name,
                    email: employeeData.email,
                    salary: employeeData.salary,
                    address: employeeData.address,
                    category_id: employeeData.category_id,
                })
                setSelectedCategory(employeeData.category_id)
            })
            .catch(err => console.log(err))
      }, [id])

      const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/'+id, employee)
        .then(result => {
            if(result.data.Status)
            {
                navigate('/dashboard/employee')
            }
            else
            {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
      }
  return (
    <div>
        <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              value={employee.email}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              value={employee.salary}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter Address"
              value={employee.address}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default EditEmployee