import { Link } from "react-router-dom";
import { Button, Col, Container, Form, Modal, Nav, NavDropdown, Row, Table } from "react-bootstrap";
import "./AdminPages.css"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMenu } from "../../context/menuContext";

function MenuAdminPage (){

 
  const [params,setParams]  = useState()
  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors}
  } = useForm();
  const {getDish,updateDish,deleteDish,createDish,getMenu,menu} = useMenu()
  
  const [show, setShow] = useState(false);
  const[create,setCreate] = useState(false)

  useEffect(()=>{
    getMenu()
   
  
    
},[menu])
 
// Modal functions
//Create Dish  
  const onCreate = handleSubmit((data)=>{
console.log(data)
if(data.available == true) {data.available = "Disponible"}
else if(data.available == false) {data.available = "No disponible"};
      if (params != null){
        updateDish(params,data)
             }else{
              createDish(data);}
      setShow(false);
      setParams(null)
   })
 


 
   const handleClose = (event) => {setShow(false);
     event.preventDefault()}
   const handleShow = (event) => {setShow(true) ;
    event.preventDefault()
   setCreate(true)};
  //Update Dish

  const handleShowUpdate = async (id) => {setShow(true) ;
    setCreate(false)
    setParams(id)
    const dish = await getDish(id)
    setValue('meal',dish.meal)
    setValue('available',dish.available)
    setValue('description',dish.description)
    setValue('categorie',dish.categorie)
    setValue('price',dish.price)
    setValue('image',dish.image)

  };
    
    
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
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Plato</th>
          <th>Estado</th>
          <th>Categoria</th>
          <th>Descripcion</th>
          <th>Precio</th>
          <th>Editar</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        {menu.map(dish =>
          <tr key={menu._id}>
          <td><img src={dish.image} alt="IMG" /></td>
          <td>{dish.meal}</td>
          <td>{dish.available}</td>
          <td>{dish.categorie}</td>
          <td>{dish.description}</td>
          <td>${dish.price}</td>
          <td><Button variant="warning" onClick={()=>{handleShowUpdate(dish._id)}}>✏</Button></td>
          <td><Button variant="danger" onClick={()=>{deleteDish(dish._id)}}>🗑</Button></td>
        </tr>
          )}
      
      </tbody>
      
    </Table>
      </Row>
    <Button variant="primary mt-1" onClick={handleShow}>Crear Nuevo plato</Button>

          {/* Create Modal */}
    <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Crear nuevo Plato</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
        <Form className="mb-3">
        <Form.Group className="mb-3" controlId="formMeal">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Nombre del Plato..."  {...register("meal", { required: true })}/>
              </Form.Group>
              {errors.meal && (<p className="text-red">El campo es requerido</p>)}
        <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control type="text" placeholder="Descripcion..."  {...register("description", { required: true })}/>
              </Form.Group>
              {errors.description && (<p className="text-red">El campo es requerido</p>)}
              <Form.Group className="mb-3" controlId="formAvaliable">
                <Form.Label>Disponible?</Form.Label>
                <Form.Check aria-label="option 1"   
             {...register("available",)}/>
              </Form.Group>
              

              <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Precio:</Form.Label>
        <Form.Control type="number" name="numberInput" placeholder="Ingresa un numero..."  {...register("price", { required: true })} />
              </Form.Group>
              {errors.price && (<p className="text-red">El campo es requerido</p>)}
              
              <Form.Group className="mb-3" controlId="formCategorie">
                <Form.Label>Categoria</Form.Label>
                <Form.Control type="text" placeholder="Hamburguesas,Guarnicion..." {...register("categorie", { required: true })} />
              </Form.Group>
              {errors.categorie && (<p className="text-red">El campo es requerido</p>)}
              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="text" placeholder="Image Name..." {...register("image", { required: true })} />
              </Form.Group>
              {errors.image && (<p className="text-red">El campo es requerido</p>)}
        </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white">
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {create ? (<Button variant="primary" onClick={onCreate} >
            Guardar
          </Button>):(<Button variant="primary" onClick={onCreate} >
            Editar
          </Button>)}
          
        </Modal.Footer>
      </Modal>

      </Container>
    )
}

export default MenuAdminPage