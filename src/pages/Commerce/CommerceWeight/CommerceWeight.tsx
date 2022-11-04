import { Container, Button, Row, Col } from "react-bootstrap";
import "../CommercePlot/CommerceWeight.scss";

export function CommercePlot() {
    return (
        <Container>
            <div className="main-box">
                <Row>
                    <Col className="title-box">
                        <span>Silos</span>
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