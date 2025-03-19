import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import AttributesFilterComponent from "../components/filterQueryResultOption/AttributesFilterComponent";
import CategoryFilterComponent from "../components/filterQueryResultOption/CategoryFilterComponent";
import PriceFilterComponent from "../components/filterQueryResultOption/PriceFilterComponent";
import RatingFilterComponent from "../components/filterQueryResultOption/RatingFilterComponent";
import PaginationComponent from "../components/PaginationComponent";
import ProductForListComponent from "../components/ProductForListComponent";
import SortOptionsComponent from "../components/SortOptionsComponent";


export default function ProductListPage() {
  return (
    <Container fluid>
    <Row>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item className="mb-3 mt-3">
            <SortOptionsComponent />
          </ListGroup.Item>
          <ListGroup.Item>
            FILTER: <br />
            <PriceFilterComponent />
          </ListGroup.Item>
          <ListGroup.Item>
            <RatingFilterComponent />
          </ListGroup.Item>
          <ListGroup.Item>
            <CategoryFilterComponent />
          </ListGroup.Item>
          <ListGroup.Item>
            <AttributesFilterComponent />
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant="primary">Filter</Button>
            <Button variant="danger">Reset filters</Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={9}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <ProductForListComponent
            key={idx}
            images={["games", "monitors", "tablets", "games", "monitors"]}
            idx={idx}
          />
        ))}
        <PaginationComponent />
      </Col>
    </Row>
  </Container>
  )
}
