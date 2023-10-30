import { createContext, useContext, useState } from "react";
import { createOrderRequest, deleteOrderRequest, getOrderRequest, getOrdersRequest, updateOrderRequest } from "../api/pedidos";

const OrdersContext = createContext()

export const useOrders = () =>{
    const context = useContext(OrdersContext)
    if(!context){
        throw new Error("useOrders must be used within OrderProvider")
    }
    return context
}

export function OrdersProvider ({children}){
  const [backOrders,setBackOrders] = useState([])
    const [order, setOrder] = useState({
        name: '',
        price: 0,
      });
      const[totalOrders,setTotalOrders] = useState([])
      
  const getOrders = async () =>{
    try {const res = await getOrdersRequest()
    
   setBackOrders(res.data)

    
    } catch (error) {
      console.log(error)
    }
       
  }
  const getOrder = async(id) =>{
    try {
      const res = await getOrderRequest(id)
   return(res.data)
    } catch (error) {
      console.log(error)
    }
  
  }
      const createOrder = async(order) =>{
        try {
          const res = await createOrderRequest(order)
          console.log(res)
          
        } catch (error) {
          console.log(error)
        }
      } 
      const updateOrder = async(id,order)=>{
        try {
       const res = await updateOrderRequest(id,order)
       console.log(res)
          
        } catch (error) {
          console.log(error)
        }  
        }
        const deleteOrder = async(id) =>{
          try {
            const res = await deleteOrderRequest(id)
            if (res.status ==200) setBackOrders(backOrders.filter((order) => order._id != id))
            console.log(res)

          } catch (error) {
            console.log(error)
          }
        
        }

    return (<OrdersContext.Provider value={{order,setOrder,totalOrders,setTotalOrders,createOrder,getOrders,getOrder,updateOrder,deleteOrder,backOrders}}>{children}</OrdersContext.Provider>);
}




