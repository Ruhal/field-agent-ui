import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AliasNav() {
    return(
      <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/alias">Alias Database</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/alias" >Find by ID </Nav.Link>
                <Nav.Link as={Link} to="/alias/add" >Add an Alias</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar> 
    );
}