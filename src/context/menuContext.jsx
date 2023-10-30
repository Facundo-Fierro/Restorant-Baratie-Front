import { createContext, useContext, useState } from "react";
import { createDishRequest, deleteDishRequest, getDishRequest, getMenuRequest, updateDishRequest } from "../api/menu";

const MenuContext = createContext();

export const useMenu = () =>{
    const context = useContext(MenuContext)
    if(!context){
        throw new Error("useMenu must be used within MenuProvider")
    }
    return context
}

export function MenuProvider({ children }) {
    const [menu,setMenu] = useState([])

  const getMenu = async () =>{
    try {const res = await getMenuRequest()
    setMenu(res.data)
    
    } catch (error) {
      console.log(error)
    }
       
  }
  const getDish = async(id) =>{
    try {
      const res = await getDishRequest(id)
   return(res.data)
    } catch (error) {
      console.log(error)
    }
  
  }

    const createDish = async(dish) =>{
      try {
        const res = await createDishRequest(dish)
        console.log(res)
        
      } catch (error) {
        console.log(error)
      }
    } 

    const updateDish = async(id,dish)=>{
      try {
     const res = await updateDishRequest(id,dish)
     
      console.log(res)
      } catch (error) {
        console.log(error)
      }  
      }

    

    const deleteDish = async(id) =>{
      try {
        const res = await deleteDishRequest(id)
        if (res.status ==204) setDish(menu.filter((dish) => dish._id != id))
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    
    }

    return (<MenuContext.Provider value={{menu,getMenu,getDish,createDish,updateDish,deleteDish}}>{children}</MenuContext.Provider>);
}
