import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ProtectedRoute = ({children}) => {
    const user = useSelector(state=>state.user.id)
    if(!user){
        return <Navigate to="/" />
    }
   

    return <><Navbar/>{children}</>
 
}

export default ProtectedRoute