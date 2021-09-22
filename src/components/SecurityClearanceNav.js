import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SecurityClearanceNav() {
    return(
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
            <Navbar.Brand as={Link} to="/securityclearance" >Security Clearance Database</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link as={Link} to="/securityclearance" >Display Security Clearances</Nav.Link>
                <Nav.Link as={Link} to="/securityclearance/add" >Add an Security Clearance</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}


