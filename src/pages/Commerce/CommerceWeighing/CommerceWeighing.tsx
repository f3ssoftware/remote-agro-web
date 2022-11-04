import { Container, Button, Row, Col } from "react-bootstrap";
import "../CommerceWeighing/CommerceWeighing.scss";

export function CommerceWeighing() {
    return (
        <Container>
            <div className="main-boxW">
                <Row>
                    <Col md={2} className="title-boxW">
                        <span>Pesagens</span>
                    </Col>
                    <Col md={1}>
                            <Button className="inputs-btnW">Entrada</Button>
                        </Col>
                        <Col md={1}>
                            <Button className="inputs-btnW" >Saída</Button>
                        </Col >
                        <Col md={1}>
                            <Button className="inputs-btnW" >Avulsa</Button>
                        </Col>
                        <Col md={2}>
                            <Button className="inputs-btnW" >Transferência</Button>
                        </Col>
                    <Col md={2}>
                        <Button variant="success" className="plot-btnW">
                            +
                        </Button>{" "}
                    </Col>
                </Row>
            </div>
        </Container>
    );
}