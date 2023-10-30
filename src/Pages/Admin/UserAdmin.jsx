import {  Link } from "react-router-dom";
import { Button, Col, Container, Form, Modal, Nav, NavDropdown, Row, Table } from "react-bootstrap";
import "./AdminPages.css"
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
function UserAdminPage (){

  const [params,setParams]  = useState()
  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors}
  } = useForm();
  const {getUsers,updateUser,deleteUser,createUser,getUser,Users} = useUser()
  
  const [show, setShow] = useState(false);
  const[create,setCreate] = useState(false)
  useEffect(()=>{
    getUsers()
      
},[])


 
// Modal functions
//Create User
const onCreate = handleSubmit((data)=>{

        if (params != null){
          updateUser(params,data)
               }else{
                console.log(data)
                createUser(data);}
        setShow(false);
        setParams(null)
     })
   
 


 
   const handleClose = (event) => {setShow(false);
     event.preventDefault()}
   const handleShow = (event) => {setShow(true) ;
    event.preventDefault()
   setCreate(true)};
  //Update User

  const handleShowUpdate = async (id) => {setShow(true) ;
    setCreate(false)
    setParams(id)
    const user = await getUser(id)
    setValue('username',user.username)
    setValue('name',user.name)
    setValue('email',user.email)
    setValue('role',user.role)
 
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
          <th>Nombre de Usuario</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Editar</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        {Users.map((user,index) =>
          <tr key={user._id}>
            <td>{index}</td> 
          <td>{user.username}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>{user.status}</td>
          <td><Button variant="warning" onClick={()=>{handleShowUpdate(user._id)}}>✏</Button></td>
          <td><Button variant="danger" onClick={()=>{deleteUser(user._id)}}>🗑</Button></td>
        </tr>
          )}
      
      </tbody>
      
    </Table>
      </Row>
    <Button variant="primary mt-1" onClick={handleShow}>Crear Nuevo Usuario</Button>

          {/* Create Modal */}
    <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Crear nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
        <Form className="mb-3">
        <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Nombre de Usuario </Form.Label>
                <Form.Control type="text" placeholder="Nombre del Usuario..."  {...register("username", { required: true ,minLength:4,maxLength:50})}aria-invalid={errors.username ? "true" : "false"}/>
              </Form.Group>
              {errors.username?.type == "required" && (<p className="text-red">El nombre de Usuario es requerido</p>)}
              {errors.username?.type == "minLength" && (<p className="text-red">El nombre de Usuario debe tener almenos 4 caracteres </p>)}
              {errors.username?.type == "maxLength" && (<p className="text-red">El nombre de Usuario es demasiado largo</p>)}
        <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control type="text" placeholder="Peter Perez..."  {...register("name", { required: true,minLength:6,maxLength:60 })}aria-invalid={errors.name ? "true" : "false"}/>
              </Form.Group>
              {errors.name?.type == "required" && (<p className="text-red">El nombre es requerido</p>)}
              {errors.name?.type == "minLength" && (<p className="text-red">El nombre  debe tener almenos 4 caracteres </p>)}
              {errors.name?.type == "maxLength" && (<p className="text-red">El nombre  es demasiado largo</p>)}
              <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="emailInput" placeholder="example@hotmail.com..."  {...register("email", { required: true ,minLength:6,maxLength:50})} aria-invalid={errors.email ? "true" : "false"}/>
              </Form.Group>
              {errors.email?.type == "required" && (<p className="text-red">El email es requerido</p>)}
              {errors.email?.type == "minLength" && (<p className="text-red">El   email es invalido</p>)}
              {errors.email?.type == "maxLength" && (<p className="text-red">El email  es demasiado largo</p>)}
              <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" name="passwordInput" placeholder="Contraseña..."  {...register("password", { required: true ,minLength:8,maxLength:50})} aria-invalid={errors.password ? "true" : "false"}/>
              </Form.Group>
              {errors.password?.type == "required" && (<p className="text-red">La contrseña es requerida</p>)}
              {errors.password?.type == "minLength" && (<p className="text-red">La contrseña debe tener almenos 8 caracteres </p>)}
              {errors.password?.type == "maxLength" && (<p className="text-red">La contrseña es demasiado larga</p>)}
      
              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Rol</Form.Label>
                
                <Form.Label>Selecciona una Opcion:</Form.Label>
        <Form.Select {...register("role", { required: true })}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          
        </Form.Select>
              </Form.Group>
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

export default UserAdminPage