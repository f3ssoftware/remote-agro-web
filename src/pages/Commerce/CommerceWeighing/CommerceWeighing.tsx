import { Container, Button, Row, Col } from "react-bootstrap";
import "../CommerceWeighing/CommerceWeighing.scss";

export function CommerceWeighing() {
    return (
        <Container>
            <div className="main-box">
                <Row>
                    <Col className="title-box">
                        <span>Pesagens</span>
                    </Col>
                    <Col>
                        <Button variant="success" className="plot-btn">
                            +
                        </Button>{" "}
                    </Col>
                </Row>
            </div>
        </Container>
    );
}