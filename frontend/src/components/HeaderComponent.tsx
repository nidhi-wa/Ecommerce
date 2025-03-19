import {Container,Nav,Navbar,NavDropdown,Badge,Form,DropdownButton,Dropdown,Button,InputGroup} from 'react-bootstrap';
import { NavLink , Link} from 'react-router-dom';

export default function HeaderComponent() {
  return (
         <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Best Online Shop</Navbar.Brand>
    
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <InputGroup>
              <DropdownButton id="dropdown-basic-button" title="All">
              <Dropdown.Item >Electronics</Dropdown.Item>
              <Dropdown.Item >Women Clothes</Dropdown.Item>
              <Dropdown.Item >Acessories</Dropdown.Item>
              <Dropdown.Item >Home Decor</Dropdown.Item>

            </DropdownButton>
          <Form.Control type="text" placeholder="Search in Shop" />
          <Button variant="warning">
          <i className="bi bi-search text-dark"></i>
            </Button>
          </InputGroup>
          </Nav>
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <Nav.Link href="/admin/orders">
            <i className="bi bi-1-circle-fill"></i>
            Admin</Nav.Link>
            <Nav.Link href="#link">Pricing</Nav.Link>
            <NavDropdown title="Nidhi Singh" id="basic-nav-dropdown">
              <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My orders</NavDropdown.Item>
              <NavDropdown.Item eventKey="/user" as={Link} to="/user">My Profile</NavDropdown.Item>
              <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">Logout</NavDropdown.Item>
              <NavDropdown.Divider />
  
            </NavDropdown>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
            <Nav.Link as={NavLink} to="/cart"><i className="bi bi-cart4"></i><Badge bg="danger">2</Badge>Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
  )
}
