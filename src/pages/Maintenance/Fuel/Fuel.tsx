import { Row, Col, Card, Table } from "react-bootstrap"
import richesImg from '../../../assets/images/bens.png';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../..";
import { asyncFetchTanks } from "../../../stores/maintenance.store";
import "./Fuel.scss";

export function Fuel() {
    const { maintenance } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(asyncFetchTanks());
    }, []);
    return <div>
        <Row>
            <Row>
                <Col md={4}>
                    <img src={richesImg} alt="" />
                </Col>
                <Col md={8}>
                    <Card className="ra-card">
                        <Card.Body>
                            <Card.Title>Histórico</Card.Title>
                            <Table striped hover>
                                <thead style={{ backgroundColor: '#243C74', color: '#fff', border: 'none' }}>
                                    <tr>
                                        <th>Data</th>
                                        <th>Maquinário</th>
                                        <th>Quantidade</th>
                                        <th>Tanque</th>
                                    </tr>
                                </thead>
                                <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                                    {/* {maintenance?.parts?.map(part => {
                                        return <tr>
                                            <td>{part?.createdAt}</td>
                                            <td>{part?.name}</td>
                                            <td>{part?.quantity}</td>
                                            <td>{part?.}</td>
                                        </tr>
                                    })} */}

                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop: '2%' }}>
                <Col md={4}>
                    <Card className="ra-card">
                        <Card.Body>
                            <Card.Title>Tanques</Card.Title>
                            <Card.Text>
                                {maintenance.tanks.map(tank => {
                                    return <div className="fuel-card">
                                        <Row>
                                            <Col>
                                                <h3>{tank?.name}</h3>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={8}></Col>
                                            <Col md={4}>{tank?.quantity} L</Col>
                                        </Row>
                                    </div>
                                })}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Row>
    </div>
}