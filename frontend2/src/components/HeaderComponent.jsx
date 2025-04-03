import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Form,
  DropdownButton,
  Dropdown,
  Button,
  InputGroup,
} from "react-bootstrap";

import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState ,useRef} from "react";
import { getCategories } from "../redux/actions/categoryActions";
import socketIOClient from "socket.io-client";
import { setChatRooms, setMessageReceived, removeChatRoom } from "../redux/actions/chatActions";

const HeaderComponent = () => {
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const { categories} = useSelector((state) => state.getCategories);
  const { messageReceived } = useSelector((state) => state.adminChat);

  const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  console.log(categories.name,'categories');

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const submitHandler = (e) => {
     if (e.keyCode && e.keyCode !== 13) return;
     e.preventDefault();
     if (searchQuery.trim()) {
         if (searchCategoryToggle === "All") {
             navigate(`/product-list/search/${searchQuery}`);
         } else {
             navigate(`/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}/search/${searchQuery}`);
         }
     } else if (searchCategoryToggle !== "All") {
         navigate(`/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`);
     } else {
         navigate("/product-list");
     }
  }

  useEffect(() => {
    if (userInfo.isAdmin) {
      var audio = new Audio("/audio/chat-msg.mp3");

      if (!socketRef.current) {
        socketRef.current = socketIOClient("http://localhost:5000", {
          transports: ["websocket", "polling"],
          withCredentials: true,
        });

        // Store socket globally for other components to access
        window.adminSocket = socketRef.current;

        socketRef.current.emit("admin connected with server", "Admin" + Math.floor(Math.random() * 1000000000000));

        socketRef.current.on("server sends message from client to admin", ({ user, message }) => {
          dispatch(setChatRooms(user, message));
          dispatch(setMessageReceived(true));
          audio.play();
        });

        socketRef.current.on("disconnected", ({ reason, socketId }) => {
          dispatch(removeChatRoom(socketId));
        });

        return () => {
          if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
          }
        };
      }
    }
  }, [userInfo.isAdmin, dispatch]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand as={NavLink} to="/">TechMarket</Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <InputGroup size="lg" >
            <DropdownButton id="dropdown-basic-button" title={searchCategoryToggle}>
              <Dropdown.Item onClick={() => setSearchCategoryToggle("All")}>All</Dropdown.Item>
              { Array.isArray(categories) && categories.map((category, id) => (
                <Dropdown.Item key={id} onClick={() => setSearchCategoryToggle(category.name)}>
                  {category.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Form.Control
              onKeyUp={submitHandler}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search in shop ..."
            />
            <Button onClick={submitHandler} variant="warning">
              <i className="bi bi-search text-dark"></i>
            </Button>
          </InputGroup>
        </Nav>

        <Nav>
          {userInfo.isAdmin ? (
            <Nav.Link as={NavLink} to="/admin/orders">
              Admin
              {messageReceived && (
                <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
              )}
            </Nav.Link>
          ) : userInfo.name && !userInfo.isAdmin ? (
            <NavDropdown title={`${userInfo.name} ${userInfo.lastName}`} id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/user/my-orders">
                My orders
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user">
                My profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
            </>
          )}

          <Nav.Link as={NavLink} to="/cart">
            <Badge pill bg="danger">{itemsCount === 0 ? "" : itemsCount}</Badge>
            <i className="bi bi-cart-dash"></i>
            <span className="ms-1">CART</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default HeaderComponent;
