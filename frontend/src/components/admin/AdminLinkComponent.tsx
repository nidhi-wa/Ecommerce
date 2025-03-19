import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export default function AdminLinkComponent() {
  return (
    <Navbar bg="light" variant="light">
    <Nav className="flex-column">
      <NavLink className="nav-link" to="/admin/orders">
        <Nav.Link>Orders</Nav.Link>
      </NavLink>
      <NavLink className="nav-link" to="/admin/products">
        <Nav.Link>Products</Nav.Link>
      </NavLink>
      <NavLink className="nav-link"to="/admin/users">
        <Nav.Link>Users</Nav.Link>
      </NavLink>
      <NavLink className="nav-link"to="/admin/chats">
        <Nav.Link>Chats</Nav.Link>
      </NavLink>
      <NavLink className="nav-link" to="/admin/analytics">
        <Nav.Link>Analytics</Nav.Link>
      </NavLink>
      <Nav.Link>Logout</Nav.Link>
    </Nav>
  </Navbar>
  )
}
