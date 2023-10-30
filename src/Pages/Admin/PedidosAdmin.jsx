import { Link,} from "react-router-dom";
import { Button, Col, Container, Nav, NavDropdown, Row, Table } from "react-bootstrap";
import "./AdminPages.css"
import { useOrders } from "../../context/ordersContext";
import { useEffect, useReducer, useState } from "react";
import { useUser } from "../../context/userContext";
function PedidosAdminPage (){

  const {backOrders,getOrders,getOrder,updateOrder,deleteOrder} = useOrders()
  const [reducerValue,forceUpdate] =useReducer(x =>x+1,0)
  const changeStatus = async (id) =>{
    const dish = await getOrder(id)
    if(dish.status ==  "Entregado") {dish.status = "En Progreso..."}
    else if(dish.status == "En Progreso..."){ dish.status  = "Entregado"}
    updateOrder(id,dish)
   forceUpdate()
   
  }

  useEffect(()=>{
     getOrders()

   
     
      
},[reducerValue])
    return(
        <Container fluid className="admin-pages">
        <Row>
        <Col className="nav-col" >
          <Nav className="nav " variant="underline" defaultActiveKey={['3']} >
            <Nav.Item className="ms-5">
              <Nav.Link as={Link} to="/home" eventKey="0">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/menu" eventKey="1" >Menu</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/pedidos" eventKey="2">Pedidos</Nav.Link>
            </Nav.Item>
    <NavDropdown
              title="Admin"
              id="admin-button"
              className="end text-black"
             
            >
           <NavDropdown.Item as={Link} to="/adminUsuarios">Usuarios</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/adminPedidos">Pedidos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/adminMenu">Menu</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Codigo de Usuario</th>
          <th>Pedido</th>
          <th>Categoria</th>
          <th>Total</th>
          <th>ubicacion</th>
          <th>Estado</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
      {backOrders ?( backOrders.map((order,index) =>
       
       <tr key={order._id}>
          <td>{index}</td>
          <td>{order.User}</td>
          <td>{order.Dishes.map(dish=> <p className="d-flex mt-3 ms-1 " key={dish._id}>{dish.name} </p>)}</td>
          <td>{order.Total}</td>
          <td>{order.ubication}</td>
          <td>{order.paymentMethod}</td>
          <td><Button variant={order.status == "Entregado" ?("success"): ("danger")} onClick={() => changeStatus(order._id)} >{order.status}</Button></td>
          <td><Button variant="danger" onClick={()=>deleteOrder(order._id)} >🗑</Button></td>
        </tr>
 
     ) ): (<p>No hay Pedidos</p>) }
      
      </tbody>
      
    </Table>
      

   
       </Col>
     </Row>
      </Container>
    )
}

export default PedidosAdminPage