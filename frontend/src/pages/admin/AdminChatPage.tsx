import AdminLinkComponent from "../../components/admin/AdminLinkComponent";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import { Row, Col } from "react-bootstrap";

export default function AdminChatPage() {
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinkComponent />
      </Col>
      <Col md={10}>
        <Row>
          <AdminChatRoomComponent />
        </Row>
      </Col>
    </Row>
  );
}
