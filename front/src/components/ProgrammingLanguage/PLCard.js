import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from '../../api';

function PLCard({ pl, isEditable, setIsEditing, setPLs }) {

  const handleDelete = async (e) => {

    e.preventDefault();
    e.stopPropagation();

    const user_id = pl.user_id;
    try {
      if (window.confirm("삭제 하시겠습니까?")) {
        await Api.delete(`certificates/${pl.id}`);
        const res = await Api.get("pllist", user_id);
        setPLs(res.data);
      }
    } catch (err) {
      alert("삭제 오류", err);
    }

  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{pl.school}</span>
          <br />
          <span className="text-muted">{`${pl.major} (${
            pl.position || ""
          })`}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
            <Button
                variant="outline-danger"
                size="sm"
                className="mr-3"
                onClick={handleDelete}
              >
                삭제
              </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default PLCard;
