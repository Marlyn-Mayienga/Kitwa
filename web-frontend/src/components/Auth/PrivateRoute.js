import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoute = () => {
    const cc_token = localStorage.getItem("token")
    return (
          cc_token ? <Outlet/> : <Navigate to='/signin'/>
  )
}

export default PrivateRoute
