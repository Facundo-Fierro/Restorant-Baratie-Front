import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import "../Css/HomePage.css";
import { useUser } from "../context/userContext";
import { useEffect, useState } from "react";

function HomePage() {
  const { logout, User } = useUser();
  const navigate = useNavigate();

  const gotoMenu = () => {
    navigate("/menu");
  };
  console.log(User);
  return (
    <Container fluid className="home-page">
      <Row>
        <Col className="nav-col d-flex ">
          <Nav
            className="nav justify-content-between flex-row"
            variant="underline"
            defaultActiveKey={["0"]}
          >
            <div className="d-flex">
              <Nav.Item className="ms-5">
                <Nav.Link as={Link} to="/home" eventKey="0">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="ms-3">
                <Nav.Link as={Link} to="/menu" eventKey="1">
                  Menu
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="ms-3">
                <Nav.Link as={Link} to="/pedidos" eventKey="2">
                  Pedidos
                </Nav.Link>
              </Nav.Item>
              {/* {User.role == "admin" &&  < NavDropdown
              title="Admin"
              id="admin-button"
              className="ms-3 text-black "
             
            >
           <NavDropdown.Item as={Link} to="/adminUsuarios">Usuarios</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/adminPedidos">Pedidos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/adminMenu">Menu</NavDropdown.Item>
            </NavDropdown>} */}
            </div>
            <div className="d-flex flex-row">
              <Nav.Item className="ms-3">
                Bienvenido
                {/* <span className="text-warning fs-1">"{User.username}"</span>!! */}
              </Nav.Item>
              <Nav.Item className="ms-4 me-4">
                <button
                  className="logout"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </button>
              </Nav.Item>
            </div>
          </Nav>
        </Col>
      </Row>
      <Row
        className="justify-content-center align-items-center flex-column"
        style={{ minHeight: "90vh" }}
      >
        <Col className="d-flex justify-content-center align-items-center">
          <h1 className="invisible">Restorant Baratie</h1> <br />
        </Col>
        <Col className="d-flex justify-content-center hacerpedido">
          <div className="llama">
            <button className="textButton" onClick={gotoMenu}>
              Hacer Pedido
            </button>
          </div>
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
    </Container>
  );
}
export default HomePage;
