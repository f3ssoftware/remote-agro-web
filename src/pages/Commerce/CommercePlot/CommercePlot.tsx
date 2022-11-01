import { Container, Button, Card, Row, Col } from "react-bootstrap";
import logoCard from "../../../assets/images/logoCard.png";
import "../CommercePlot/Commerceplot.scss";

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

        <Row className="plot-cards">
          <Col md={2}>
            <Card>
              <Card.Img variant="top" src={logoCard} className="logoCard" />
              <Card.Body>
                <Card.Title className="cardTitle">Silo Metal 1</Card.Title>
                <Card.Text className="cardText">
                    <span>Soja</span> <span>258 sacas</span>
                    <span>Milho</span> <span>18,25 sacas</span>
                    <span>Trigo</span> <span>400 sacas</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card>
              <Card.Img variant="top" src={logoCard} className="logoCard" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card>
              <Card.Img variant="top" src={logoCard} className="logoCard" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
