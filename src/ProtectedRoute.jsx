import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "./context/userContext"

function ProtectedRoute (){
  const{logged,loading} = useUser();
  if(loading) return <h1>loading...</h1>
  if(!loading && !logged) return <Navigate to='/' replace/>  
  return <Outlet/>;
}

export default ProtectedRoute