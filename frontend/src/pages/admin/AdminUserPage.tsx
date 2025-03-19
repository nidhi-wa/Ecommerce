import { Row, Col, Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AdminLinkComponent from "../../components/admin/AdminLinkComponent";

const deleteHandler = () => {
    if(window.confirm("Are you sure?")) alert("User deleted!");
}

export default function AdminUserPage() {
  return (
    <Row className="m-5">
        <Col md={2}>
        <AdminLinkComponent />
        </Col>
      <Col md={10}>
        <h1>User List</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map(
              (item, idx) => (
                <tr key={idx}>
                  <td>{idx +1}</td>
                  <td>Mark</td>
                  <td>Twain</td>
                  <td>email@email.com</td>
                  <td>
                    <i className={item}></i>
                  </td>
                  <td>
                    <NavLink className="nav-link" to="/admin/edit-user">
                        <Button className="btn-sm">
                            <i className="bi bi-pencil-square"></i>
                        </Button>
                    </NavLink>
                    {" / "}
                    <Button variant="danger" className="btn-sm" onClick={deleteHandler}>
                        <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}