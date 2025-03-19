import { Carousel } from "react-bootstrap";
import { NavLink} from "react-router-dom";


export default function ProductCarouselComponent() {
  return (
    <Carousel>
    <Carousel.Item>
    <img src="/card1.jpg" crossOrigin="anonymous" alt="Logo" width="100%" height="300"  style={{objectFit : "cover"}}/>
      <Carousel.Caption>
        <NavLink className="nav-link" to="/product-details">
        <h3>First slide label</h3>
        </NavLink>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img src="/card2.jpg" alt="Logo" width="100%" height="300" style={{objectFit : "cover"}} />
      <Carousel.Caption>
      <NavLink className="nav-link" to="/product-details">
        <h3>Second slide label</h3>
        </NavLink>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img src="/card3.jpg" alt="Logo" width="100%" height="300" style={{objectFit : "cover"}} />
      <Carousel.Caption>
      <NavLink className="nav-link" to="/product-details">
        <h3>Third slide label</h3>
        </NavLink>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);
}
