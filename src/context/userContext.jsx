import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import {  loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
import { createUserRequest, deleteUserRequest, getUserRequest, getUsersRequest, updateUserRequest } from "../api/user";


export const UserContext = createContext();
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("errorr");

  }
  return context;
};
export const UserProvider = ({ children }) => {
  const[Users,setUsers]= useState([]);
  const [User, setUser] = useState(null);
  const [logged, setLogged] = useState(false);
  const[customError,setCustomError] = useState([])
  const [loading, setLoading] = useState();


  const registerFunction = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setLogged(true);
      console.log(res.data);
    } catch (error) {
      console.log(error)
      setUser(null);
    }
  }
  const loginFunction = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setLogged(true);
    } catch (error) {
      console.log(error)
      setUser(null);
    }}

    const logout = () =>{
      Cookies.remove("token");
      setUser(null);
      setLogged(false)
      
    }
    const getUsers = async () =>{
      try {const res = await getUsersRequest()
      
      setUsers(res.data)
      
      } catch (error) {
        console.log(error)
      }
         
    }
    const getUser = async(id) =>{
      try {
        const res = await getUserRequest(id)
     return(res.data)
      } catch (error) {
        console.log(error)
      }
    
    }
    const createUser = async(user) =>{
      try {
        const res = await createUserRequest(user)
        console.log(res)
        
      } catch (error) {
        console.log(error)
      }
    } 

    const updateUser = async(id,user)=>{
      try {
     const res =  await updateUserRequest(id,user)
      console.log(res)
      } catch (error) {
        console.log(error)
      }  
      }

    

    const deleteUser = async(id) =>{
      try {
        const res = await deleteUserRequest(id)
        if (res.status ==200) setUsers(Users.filter((user) => user._id != id))
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    
    }

    useEffect(() => {
      async function checkLogin() {
        const cookies = Cookies.get();
        if (!cookies.token) {
          setLoading(false);
          setLogged(false);
          return setUser(null);
        }
      
          try {
            const res = await verifyTokenRequest(cookies.token);
            if (!res.data) {
              setLogged(false);
              setLoading(false);
              return;
            }
            
              setLogged(true);
              setUser(res.data);
              setLoading(false);
            
          } catch (error) {
            setLogged(false);
            setUser(null);
            console.log(error);
            setLoading(false);
          }
        
      }
      checkLogin();
    }, []);
  ;

  return (
    <UserContext.Provider
      value={{Users,User,registerFunction,loginFunction,logout,getUsers,getUser,createUser,updateUser,deleteUser,  logged, customError, loading}}
    >
      {children}
    </UserContext.Provider>
  );
}