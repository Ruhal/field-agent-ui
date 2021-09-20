import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AgentsNav() {
    return(
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
            <Navbar.Brand as={Link} to="/agents" >Agent Database</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link as={Link} to="/agents" >Display all Agents</Nav.Link>
                <Nav.Link as={Link} to="/agents/add" >Add an Agent</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}


