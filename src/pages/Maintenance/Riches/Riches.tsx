import { Button, Card, Col, Row, Table } from "react-bootstrap";
import richesImg from '../../../assets/images/bens.png';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../..";
import { Good } from "../../../models/Good";
import { useEffect } from "react";
import { asyncFetchGoods } from "../../../stores/maintenance.store";
import { tr } from "date-fns/locale";

export function Riches() {
    const { maintenance } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(asyncFetchGoods());
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
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{marginTop: '2%'}}>
                <Col md={4}>
                    <Card className="ra-card">
                        <Card.Body>
                            <Card.Title>Bens</Card.Title>
                            <Card.Text>
                                <Table striped hover>
                                    <thead style={{ backgroundColor: '#243C74', color: '#fff', border: 'none' }}>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Tipo</th>
                                            <th>Criado em</th>
                                            <th>Vencimento IPVA</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                                        {maintenance.goods.map(good => {
                                            return <tr>
                                                <td>{good?.name}</td>
                                                <td>{good?.type}</td>
                                                <td>{new Date(good?.createdAt).toLocaleDateString('pt-BR')}</td>
                                                <td>{new Date(good?.ipva_ends_at!).toLocaleDateString('pt-BR')}</td>
                                            </tr>
                                        })}

                                    </tbody>
                                </Table>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Row>
    </div>
}