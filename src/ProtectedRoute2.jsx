import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "./context/userContext"
import { useState } from "react";

function ProtectedRoute2 (){
    const{User} = useUser()
    
    if(User.role == "user") return <Navigate to='/' replace/>  
    return <Outlet/>;
  }
  
  export default ProtectedRoute2