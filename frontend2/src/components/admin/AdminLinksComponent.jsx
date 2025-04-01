import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const AdminLinksComponent = () => {
    const dispatch = useDispatch()
  return (
    <Navbar bg="light" variant="light">
      < Nav className="flex-column">
          <Nav.Link  as={NavLink} to="/admin/orders">Orders</Nav.Link>
        
          <Nav.Link as={NavLink} to="/admin/products">Products</Nav.Link>
          <Nav.Link  as={NavLink} to="/admin/users">Users</Nav.Link>
          <Nav.Link  as={NavLink} to="/admin/chats">Chats</Nav.Link>
          <Nav.Link  as={NavLink} to="/admin/analytics">Analytics</Nav.Link>
        <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AdminLinksComponent;
