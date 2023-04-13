import { useEffect } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../..";
import { asyncFetchParts } from "../../../stores/maintenance.store";


export function Warehouse() {
    const dispatch = useDispatch<any>();
    const { maintenance } = useSelector((state: RootState) => state);

    useEffect(() => {
        dispatch(asyncFetchParts());
    }, []);
    return <div>
        <Card className="ra-card">
            <Card.Body>
                <Row>
                    <Col md={2}>
                        <h3>Almoxarifado</h3>
                    </Col>
                    <Col md={2}>
                        <Button>Entrada</Button>
                    </Col>
                    <Col md={2}>
                        <Button>Saída</Button>
                    </Col>
                    <Col md={6}>
                        <Form>
                            <Form.Control type="text" style={{ backgroundColor: "transparent", borderColor: '#4F9D24', borderRadius: '100px', height: '30px' }} placeholder="Pesquisar" onChange={(e) => {

                            }}></Form.Control>
                        </Form>
                    </Col>
                </Row>
                <Table striped hover>
                    <thead style={{ backgroundColor: '#243C74', color: '#fff', border: 'none' }}>
                        <tr>
                            <th>Nome</th>
                            <th>Código</th>
                            <th>Qntd.</th>
                            <th>Unitário (R$)</th>
                            <th>Total (R$)</th>
                            <th>Posição</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                        {maintenance.parts.map(part => {
                            return <tr>
                                <td>{part?.name}</td>
                                <td>{part?.code}</td>
                                <td>{part?.quantity}</td>
                                <td>{part?.unit_price}</td>
                                <td>{part?.quantity * part?.unit_price}</td>
                                <td>{part?.position}</td>
                            </tr>
                        })}

                    </tbody>
                </Table>
                {/* <Card.Title>Histórico</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>
    </div>
}