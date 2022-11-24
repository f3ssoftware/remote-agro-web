import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Form, Row, Table } from "react-bootstrap";

export function Soil(){
    return <div style={{ marginTop: '2%' }}>
        <Card className="ra-card">
            <Card.Body>
                <Row>
                    <Col>
                        <h4>Análises de solo</h4>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Control type="text" style={{ backgroundColor: "transparent", borderColor: '#4F9D24', borderRadius: '100px' }} placeholder="Pesquisar" onChange={(console.log) }></Form.Control>
                        </Form>
                    </Col>
                </Row>
                <div className="flex-right" style={{ marginTop: '2%', marginBottom: '2%' }}>
                    <FontAwesomeIcon icon={faCalendar} onClick={console.log}></FontAwesomeIcon>
                </div>
                <div style={{ overflowX: 'hidden', overflowY: 'scroll', maxHeight: '300px' }}>
                    <Table striped bordered hover>
                        <thead style={{ backgroundColor: '#243C74', color: '#fff', fontSize: '12px' }}>
                            <tr>
                                <th>Data</th>
                                <th>Fazenda</th>
                                <th>Talhões</th>
                                <th>Operador</th>
                                <th>Armostragem</th>
                                <th>Laboratório</th>
                                <th>Mapa de fertilidade</th>
                                <th>Mapa de aplicação</th>
                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: '#fff', color: '#000', fontSize: '12px' }}>
 
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    </div >
}