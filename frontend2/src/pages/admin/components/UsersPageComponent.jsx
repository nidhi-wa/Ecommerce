import { Row, Col, Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

import { useState, useEffect } from "react";

import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import axios from "axios";

const UsersPageComponent = ({ fetchUsers, deleteUser }) => {
  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false);
  const dispatch = useDispatch();

  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
        const data  = await deleteUser(userId);
        if(data === 'user removed') {
            setUserDeleted(!userDeleted)
        }
    }
  };

  useEffect(() => {
    const abctrl = new AbortController();

    fetchUsers(abctrl)
      .then((res) => setUsers(res))
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
  }, [userDeleted]);

  // useEffect(() => {
  //   const abctrl = new AbortController();
  //   fetchUsers(abctrl)
  //     .then((res) => setUsers(res))
  //     .catch((er) =>
  //     dispatch(logout())
  //       // console.log(
  //       //   er.response.data.message ? er.response.data.message : er.response.data
  //       // )
  //     );
  //   return () => abctrl.abort();
  // }, [userDeleted]);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
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
            {users.map(
              (user, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? <i className="bi bi-check-lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
                  </td>
                  <td>
                    <NavLink to={`/admin/edit-user/${user._id}`}>
                      <Button className="btn-sm">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </NavLink>
                    {" / "}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
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
};

export default UsersPageComponent;
