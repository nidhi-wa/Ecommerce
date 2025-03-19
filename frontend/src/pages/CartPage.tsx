import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom"; 
import CartItemComponent from "../components/CartItemComponent";

export default function CartPage() {
  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={8}>
          <h1>Shopping Cart</h1>
          <ListGroup variant="flush">
            {Array.from({ length: 3 }).map((_item, idx) => (
              <CartItemComponent key={idx} />
            ))}
          </ListGroup>
          <Alert variant="info">Your cart is empty</Alert>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Subtotal (2 Items)</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <span className="fw-bold">$892</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <NavLink className="nav-link" to="/user/cart-details">
                <Button type="button">Proceed To Checkout</Button>
              </NavLink>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}
