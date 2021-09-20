import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MainNav() {
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Field Agent UI</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" >Home</Nav.Link>
              <Nav.Link as={Link} to="/agents" >Agents </Nav.Link>
              <Nav.Link as={Link} to="/alias" >Alias</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}