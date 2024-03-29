import React,{ useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Null from 'tedious/lib/data-types/null'

const Login = () => {

    const[values, setValues] = useState({
            email: '',
            password: ''  
        })
        const [error, setError] = useState(null)
        const navigate = useNavigate()
        axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {
            if(result.data.loginStatus)
            {
                localStorage.setItem('valid', true)
                navigate('/dashboard')
            }
            else
            {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err)) 
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='text-warning'>
                {error && error}
            </div>
            <h2 className='text-center'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="Email">Email: </label>
                    <input type="email" name="Email" id="email" placeholder='Enter Email' autoComplete='off'
                    onChange={(e) => setValues({...values, email : e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="Password">Password: </label>
                    <input type="password" name="Password" id="password" placeholder='Enter Password' autoComplete='off'
                    onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log In</button>
                <div className='mb-1'>
                    <input type='checkbox' name='tick' id='tick' className='me-2' required/>
                    <label htmlFor="Password">I Agree with terms & conditions</label>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login