import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../Css/LoginPage.css";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../components/RegisterModal";

function LoginPage() {
  const { register, handleSubmit ,formState:{errors}} = useForm();

  const { loginFunction, logged } = useUser();

  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const onLogin = async (values) => {
 
    try {
      loginFunction(values);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (logged) {
      navigate("/home");
    }
  }, [logged]);

  const handleShow = () => {
    setShow(true);
    
  };
  const handleClose = () => {
    setShow(false);
   
  };

  return (
    <Container fluid className="login-page">
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Col xs={8} md={4} className="ghost-bg">
          <h4>Logueate para hacer tu pedido</h4>
          <Form className="mb-3" onSubmit={handleSubmit(onLogin)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Example@email.com"
                {...register("email", { required: true })}
               
              />
              <Form.Text className="ghost-text">
                <b>No compartiremos tu email con nadie mas</b>
              </Form.Text>
            </Form.Group>
            {errors.email && (<p className="text-red">El Email es requerido</p>)}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                {...register("password",{ required: true })}
              />
            </Form.Group>
            {errors.password && (<p className="text-red">La contrseña es requerida</p>)}
      
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button
              className="ms-2"
              variant="secondary"
              type="button"
              onClick={handleShow}
            >
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
      <RegisterModal show={show} handleClose={handleClose}></RegisterModal>
    </Container>
  );
}

export default LoginPage;
