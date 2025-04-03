import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import { Row, Col } from "react-bootstrap";

import { useEffect,useState } from "react";

import { useSelector } from "react-redux";

const AdminChatsPage = () => {
  const { chatRooms} = useSelector((state) => state.adminChat);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (window.adminSocket) {
      setSocket(window.adminSocket);
    }
  }, []);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <Row>
          { chatRooms && Object.entries(chatRooms).map((chatRoom, index) => (
            <AdminChatRoomComponent key={index} chatRoom={chatRoom} roomIndex={index + 1} socket={socket} socketUser={chatRoom[0]}  />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default AdminChatsPage;