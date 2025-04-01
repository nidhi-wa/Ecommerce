import { Row, Col, Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

import { useState, useEffect } from "react";

import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import  axios from "axios";

const ProductsPageComponent = ({ fetchProducts, deleteProduct }) => {
  const [products, setProducts] = useState([]);
   const [productDeleted, setProductDeleted] = useState(false); 
   const dispatch = useDispatch();

  const deleteHandler = async (productId) => {
    if (window.confirm("Are you sure?")) {
        const data = await deleteProduct(productId)
        if (data.message === "product removed") {
            setProductDeleted(!productDeleted);
        }
    }
  };

  useEffect(() => {
    const abctrl = new AbortController();

    fetchProducts(abctrl)
      .then((res) => setProducts(res))
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request was canceled:", err.message);
        } else {
          // Only logout if the error is due to authentication
          if (err.response?.status === 401) {
            dispatch(logout());
          } else {
            console.error("Fetch error:", err);
          }
        }
      });

    return () => abctrl.abort(); // Cleanup request on unmount
  }, [productDeleted]);
  // useEffect(() => {
  //   const abctrl = new AbortController();
  //   fetchProducts(abctrl)
  //     .then((res) => setProducts(res))
  //     .catch((er) =>
  //     dispatch(logout())
  //       // setProducts([
  //       //   {name: er.response.data.message ? er.response.data.message : er.response.data}
  //       // ])
  //     );
  //   return () => abctrl.abort();
  // }, [productDeleted]);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>
          Product List{" "}
          <NavLink to="/admin/create-new-product">
            <Button variant="primary" size="lg">
              Create new
            </Button>
          </NavLink>
        </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <NavLink to={`/admin/edit-product/${item._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </NavLink>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProductsPageComponent;
