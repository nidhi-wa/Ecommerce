import { Carousel } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ProductCarouselComponent = ({ bestSellers }) => {
  const cursorP = {
    cursor: "pointer",
  };
  console.log(bestSellers,'bestSellers');

  return bestSellers.length > 0 ? (
    <Carousel>
      {Array.isArray(bestSellers) && bestSellers.map((item, idx) => (
        <Carousel.Item key={idx}>
          <img
            crossOrigin="anonymous"
            className="d-block w-100"
            style={{ height: "300px", objectFit: "cover" }}
            src={item.images ? item.images[0].path : null}
            alt="First slide"
          />
          <Carousel.Caption>
            <NavLink style={cursorP} to={`/product-details/${item._id}`}>
              <h3>Bestseller in {item.category} Category</h3>
            </NavLink>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  ) : null;
};

export default ProductCarouselComponent;
