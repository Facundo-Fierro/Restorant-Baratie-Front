import { Link } from "react-router-dom";
import { Col, Container, Nav, NavDropdown, Row, Table } from "react-bootstrap";
import "../Css/PedidosPage.css"
import { useEffect, useState } from "react";
import { useOrders } from "../context/ordersContext";
import { useUser } from "../context/userContext";
function PedidosPage (){

  const {backOrders,getOrders} = useOrders()

  const {User} = useUser()
  useEffect(()=>{
     getOrders()

},[])

    return(
        <Container fluid className="pedidos-page">
        <Row>
        <Col className="nav-col" >
          <Nav className="nav " variant="underline" defaultActiveKey={['2']} >
            <Nav.Item className="ms-5">
              <Nav.Link as={Link} to="/home" eventKey="0">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/menu" eventKey="1" >Menu</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/pedidos" eventKey="2">Pedidos</Nav.Link>
            </Nav.Item>
            {User.role == "admin" &&<NavDropdown
              title="Admin"
              id="admin-button"
              className="end text-black"
             
            >
           <NavDropdown.Item as={Link} to="/adminUsuarios">Usuarios</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/adminPedidos">Pedidos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/adminMenu">Menu</NavDropdown.Item>
            </NavDropdown>}
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col>
       
       
      
      {backOrders ?( backOrders.map(order =>
     
      <div key={order._id} className="d-flex mt-2 order-table bg-dark align-items-center justify-content-between flex-row">
    
    <div className="d-flex flex-row align-items-center ms-3"><span className="underlined">Pedido:</span>{order.Dishes.map(dish=> <p className="d-flex mt-3 ms-1 underlined2" key={dish._id}>{dish.name} </p>)}. </div>
    <div ><span className="underlined">Estado</span>: <span className="underlined2">{order.status} </span></div>
    <div className="me-4"><span className="underlined"> Total </span>: <span className="underlined2">${order.Total} </span></div>
    </div>
  
      ) ): ("No hay Pedidos") }

    
        </Col>
      </Row>
      </Container>
    )
}

export default PedidosPage