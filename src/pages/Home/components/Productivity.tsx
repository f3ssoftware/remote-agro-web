import { Card, Col, Row } from "react-bootstrap";
import "./Productivity.scss";

export function Productivity() {
    return <Card className="ra-card">
        <Card.Body>
            <Card.Title>Produtividade</Card.Title>
            <div className="productivity-card">
                <Row>
                    <Col>
                        <b>Produtividade Soja</b>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>- Sacas/ha</h3>
                    </Col>
                </Row>
            </div>
            <div className="productivity-card">
                <Row>
                    <Col>
                        <b>Produtividade Milho</b>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>95,3 Sacas/ha</h3>
                    </Col>
                </Row>
            </div>
            <div className="productivity-card">
                <Row>
                    <Col>
                        <b>Produtividade Feijão</b>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>78,4 Sacas/ha</h3>
                    </Col>
                </Row>
            </div>
        </Card.Body>
    </Card>
}