import { Row, Col, Card, Table, Pagination, Dropdown } from "react-bootstrap"
import richesImg from '../../../assets/images/bens.png';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../..";
import { asyncFetchTanks } from "../../../stores/maintenance.store";
import "./Fuel.scss";
import { Tank } from "../../../models/Tank";

const PAGE_SIZE = 3;
export function Fuel() {
    const [tanks, setTanks] = useState<Tank[]>([]);
    const [page, setPage] = useState(1);
    // const [history, setHistory] = useState<>([]);
    const { maintenance } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(asyncFetchTanks());
    }, []);

    useEffect(() => {
        setTanks([...maintenance.tanks].slice(0, 3));

    }, [maintenance]);

    const paginate = (page: number) => {
        // [...financial.bankAccounts].slice((page - 1) * pageSize, page * pageSize)
        setTanks([...maintenance.tanks].slice(((page - 1) * PAGE_SIZE), page * PAGE_SIZE));
    }

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
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="second-col-dropdown"
                                    variant="success"
                                    id="dropdown-basic"
                                >
                                    Tanques
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {[...maintenance.tanks].map((tank, index) => {
                                        return <Dropdown.Item
                                            key={index}
                                            onClick={() => {
                                                
                                            }}
                                        >
                                            {tank?.name}
                                        </Dropdown.Item>
                                    })}

                                </Dropdown.Menu>
                            </Dropdown>
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
                                {tanks.map(tank => {
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
                                <div className="flex-center" style={{ marginTop: '10%' }}>
                                    <Pagination size="sm" >
                                        <Pagination.Prev onClick={() => {
                                            if (page > 1) {
                                                paginate(page - 1);
                                                setPage(page - 1);
                                            }
                                        }} />
                                        <Pagination.Next onClick={() => {
                                            if (page < (maintenance.tanks.length / PAGE_SIZE)) {
                                                console.log((maintenance.tanks.length / PAGE_SIZE));
                                                paginate(page + 1);
                                                setPage(page + 1);
                                            }
                                        }} />
                                    </Pagination>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Row>
    </div>
}