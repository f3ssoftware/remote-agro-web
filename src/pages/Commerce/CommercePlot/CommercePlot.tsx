import { Container, Button, Card, Row, Col } from "react-bootstrap";
import logoCard from "../../../assets/images/logoCard.png";

export function CommercePlot() {
    return (
        <Container>
            <div className="main-box">
                <span>Silos</span>
                <div>
                    <Button variant="success" className="second-card-button">
                        +
                    </Button>{" "}
                </div>
                <div className="plot-cards">
                    <Row>
                        <Col>
                            <Card style={{ width: "18rem" }}>
                                <Card.Img variant="top" src={logoCard} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: "18rem" }}>
                                <Card.Img variant="top" src={logoCard} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: "18rem" }}>
                                <Card.Img variant="top" src={logoCard} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    );
}
