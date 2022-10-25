import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row, Form, Table } from "react-bootstrap";
import "./FarmInput.scss";

export function FarmInput() {
    return (
        <div className="app-container">
            <Card className="ra-card" style={{ height: '80vh' }}>
                <Card.Title>
                    <Row>
                        <Col md={2}>
                            <h4>Estoque</h4>
                        </Col>
                        <Col md={1}>
                            <Button className="inputs-btn">Entrada</Button>
                        </Col>
                        <Col md={1}>
                            <Button className="inputs-btn">Saída</Button>
                        </Col >
                        <Col md={2}>
                            <Button className="inputs-btn">Tratar Sementes</Button>
                        </Col>
                        <Col md={6}>
                            <Form>
                                <Form.Control type="text" style={{ backgroundColor: "transparent", borderColor: '#4F9D24', borderRadius: '100px' }} placeholder="Pesquisar"></Form.Control>
                            </Form>
                        </Col>
                    </Row>
                    <Table style={{ marginTop: '5%' }}>
                        <thead style={{ backgroundColor: '#243C74', color: '#fff' }}>
                            <tr>
                                <th>Produto</th>
                                <th>Classe</th>
                                <th>Estoque Atual</th>
                                <th>Custo Unitário</th>
                                <th>Custo Total</th>
                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                            <tr>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                            </tr>
                            <tr>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Title>
            </Card>
        </div>
    )
}