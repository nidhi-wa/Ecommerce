
import { Card, Button, Row, Col } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { NavLink } from "react-router-dom";

export default function ProductForListComponent({ images, idx }: { images: string[]; idx: number }) {
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        <Col lg={5}>
          <Card.Img variant="top" src={"/images/" + images[idx] + "-category.png"} />
        </Col>
        <Col lg={7}>
          <Card.Body>
            <Card.Title>Product Name Lorem ipsum dolor sit amet</Card.Title>
            <Card.Text>
              Product Description Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Magni ipsa ducimus architecto explicabo id
              accusantium nihil exercitationem autem porro esse.
            </Card.Text>
            <Card.Text>
              <Rating readonly size={20} initialValue={5} /> (1)
            </Card.Text>
            <Card.Text className="h4">
              $124{" "}
              <NavLink  className="nav-link" to="/product-details">
                <Button variant="danger">See product</Button>
              </NavLink>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}
