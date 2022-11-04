import { Container, Button, Card, Row, Col } from "react-bootstrap";
import logoCard from "../../../assets/images/logoCard.png";
import "../CommercePlot/Commerceplot.scss";

export function CommercePlot() {
    return (
        <Container>
            <div className="main-box">
                <Row>
                    <Col md={2}className="title-box">
                        <span>Silos</span>
                    </Col>
                    <Col md={1}>
                        <Button variant="success" className="plot-btn">
                            +
                        </Button>{" "}
                    </Col>
                </Row>

                <Row className="plot-cards">
                    <Col md={2}>
                        <Card className="cardBody">
                            <Card.Img variant="top" src={logoCard} className="logoCard" />
                            <Card.Body>
                                <Card.Title className="cardTitle">Silo Metal 1</Card.Title>
                                <Card.Text className="cardText">
                                    Soja 258 sacas Milho 18,25 sacas Trigo 400 sacas
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2}>
                        <Card className="cardBody">
                            <Card.Img variant="top" src={logoCard} className="logoCard" />
                            <Card.Body>
                                <Card.Title className="cardTitle">Barracão</Card.Title>
                                <Card.Text className="cardText">
                                    Soja 258 sacas Milho 18,25 sacas Trigo 400 sacas
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2}>
                        <Card className="cardBody">
                            <Card.Img variant="top" src={logoCard} className="logoCard" />
                            <Card.Body>
                                <Card.Title className="cardTitle">Silo Metal 1</Card.Title>
                                <Card.Text className="cardText">
                                    Soja 258 sacas Milho 18,25 sacas Trigo 400 sacas
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
