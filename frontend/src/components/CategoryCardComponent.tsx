import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const CategoryCardComponent = ({ category, idx }) => {
  const images = [
    "/card1.jpg",
    "/card2.jpg",
    "/card3.jpg",
    "/card4.jpg",
    "/card6.jpg",
    "/card7.jpg",
  ];
  return (
    <Card>
      <Card.Img crossOrigin="anonymous" variant="top" src={images[idx]} />
      <Card.Body>
        <Card.Title>{category}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <NavLink to="/product-list">
          <Button variant="primary">Go to the Category</Button>
        </NavLink>
      </Card.Body>
    </Card>
  );
};

export default CategoryCardComponent;