import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'

const Profile = () => {
  const [admin, setAdmin] = useState();
  useEffect(()=> {
    axios.get('http://localhost:3000/auth/profile')
    .then(result => {
      if(result.data.Status)
      {
        setAdmin(result.data.Result[0])
      }
      else
      {
        console.error(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  },[])

  return (
    <div className='d-flex justify-content-center'>
      <div className='d-flex flex-column align-items-center mt-5 shadow p-5 w-50'>
        <h2 className=''>Profile</h2>
        <div className=''>
          <h4>Name: {admin}</h4>
          <h4>Email: {admin}</h4>
        </div>
      </div>
    </div>
  )
}

export default Profile