import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Modal, Nav, NavDropdown, Row, Table } from "react-bootstrap";
import "../Css/MenuPage.css"
import { useMenu } from "../context/menuContext";
import {useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import { useOrders } from "../context/ordersContext";
import { useForm } from "react-hook-form";
import { useUser } from "../context/userContext";
import { toast} from 'react-toastify';

function MenuPage (){
  const {User} = useUser()
  const [show, setShow] = useState(false);
  const [price,setPrice] = useState(0)
 const  navigate = useNavigate()
  const {menu,getMenu} = useMenu()
  const{totalOrders,setTotalOrders,createOrder} = useOrders()
  const{register,handleSubmit} = useForm()
  


  useEffect(()=>{
    getMenu()
},[])
const calculateTotal = () =>{
    
  const totalPrice = totalOrders.reduce((acc, order) => acc + order.price, 0);
  setPrice(totalPrice)
  
}
const deleteOrder = (index) =>{
  const newTotalOrders = [...totalOrders]
  newTotalOrders.splice(index,1)
  setTotalOrders(newTotalOrders)
 }
  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    if(totalOrders.length > 0){
   
    
    calculateTotal()
  
    setShow(true);}
    else{
      toast.error("No puedes hacer una orden vacia!", {
        position: toast.POSITION.TOP_LEFT
      });

    }
   
  }
 const makeOrder = handleSubmit((data) => {
   const orderData ={...data,
    Total:price,
    Dishes:totalOrders} 
  
   createOrder(orderData)
   navigate("/pedidos")
    })


   const FullOrder = totalOrders.map((order,index) => {  return(
    <tr key={index}>
    <td>{index}</td>
    <td>{order.name}</td>
    <td>${order.price}</td>
    <td><Button variant="danger" onClick={()=>{deleteOrder(index)}} >🗑</Button></td>
  </tr>
)}) 
    return(
        <Container fluid className="menu-page">
        <Row>
        <Col className="nav-col">
          <Nav className="nav " variant="underline" defaultActiveKey={['1']} >
            <Nav.Item className="ms-5">
              <Nav.Link as={Link} to="/home" eventKey="0">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/menu" eventKey="1" >Menu</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/pedidos" eventKey="2">Pedidos</Nav.Link>
            </Nav.Item>
            {User.role == "admin" &&  <NavDropdown
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
        {menu.map(dish =>(
            <MenuCard dish={dish} key={dish._id}></MenuCard>
        ))
           
        }
      </Row>
      <Row className="d-flex align-items-end justify-content-center">
        <Col md="6" className=" mt-5 ">
      <Table striped bordered  variant="dark" >
      <thead>
        <tr>
          <th colSpan={4}>Pedido</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>#</th>
          <th>Plato</th>
          <th>Precio</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
       
      {FullOrder}
        
      </tbody>
      
    </Table>
    <Button variant="primary mt-1" onClick={handleShow}>Hacer Pedido</Button>

    </Col>
      </Row>
      <Row>
        <Col className="footer">
          <footer>
            <div className="box">
              <p>Restorant Baratie Todos los derechos reservados</p>
            </div>
            <div className="box">
              <p>Contactanos al +54-9-38652062062</p>
            </div>
          </footer>
        </Col>
      </Row>
    //Modal Para pedir

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton className="bg-dark">
          <Modal.Title>Hacer Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
        <Form className="mb-3">
        <Form.Group className="mb-3" controlId="formDetails">
                <Form.Label>Detalles</Form.Label>
                <Form.Control type="text" placeholder="Sin verduras,sin Aderezo..."  {...register("details")}/>
              </Form.Group>
        <Form.Group className="mb-3" controlId="ubication">
                <Form.Label>Direccion</Form.Label>
                <Form.Control type="text" placeholder="Calle y Numero,Piso...."  {...register("ubication", { required: true })}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="paymentMethod">
                <Form.Label>Metodo de Pago</Form.Label>
                
                <Form.Label>Selecciona una Opcion:</Form.Label>
        <Form.Select {...register("paymentMethod", { required: true })}>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          
        </Form.Select>
              </Form.Group>
            
        </Form>
        <ul>
            {totalOrders.map((order, index) => (
              <li key={index}>{`Item ${index + 1}: ${order.name}`}</li>
            ))}
          </ul>
        <p>TOTAL ${price}</p>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={makeOrder}>
            Hacer pedido
          </Button>
        </Modal.Footer>
      </Modal>

      </Container>
    )
}

export default MenuPage