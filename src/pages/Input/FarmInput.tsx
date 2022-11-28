import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import { Product } from "../../models/Product";
import { asyncFetchInput } from "../../stores/input.store";
import { currencyFormat } from "../../utils/currencyFormat";
import "./FarmInput.scss";
import { EntranceModal } from "./modals/EntranceModal/EntranceModal";

import { HistoryModal } from "./modals/HistoryModal";
import { SeedsTreatment } from "./modals/SeedsTreatment/SeedsTreatment";
import { WithdrawalModal } from "./modals/WithdrawalModal.tsx/WithdrawalModal";

const initialProducts: Product[] = [];
export function FarmInput() {
    const input = useSelector((state: RootState) => state.input);
    const dispatch = useDispatch<any>();
    const [findTerm, setFindTerm] = useState('');
    const [products, setProducts] = useState(initialProducts);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [showEntranceModal, setShowEntranceModal] = useState(false);
    const [historySelectedProduct, setHistorySelectedProduct] = useState(new Product());
    const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
    const [showSeedsTreatment, setShowSeedsTreatment] = useState(false);

    const find = () => {
        setProducts(input?.inputs?.filter((product: Product) => {
            if (product!.product!.name?.toUpperCase().includes(findTerm.toUpperCase()) || product!.product!.class?.includes(findTerm.toUpperCase())) {
                return product;
            }
            return null;
        }));
    }

    useEffect(() => {
        find();
    }, [findTerm]);

    useEffect(() => {
        dispatch(asyncFetchInput());
    }, []);

    useEffect(() => {
        setProducts(input.inputs);
    }, [input])

    return (
        <div className="app-container">
            <Card className="ra-card" style={{ height: '80vh' }}>
                <Card.Title>
                    <Row>
                        <Col md={2} sm={1}>
                            <h4>Estoque</h4>
                        </Col>
                        <Col md={1} sm={2}>
                            <Button className="inputs-btn" onClick={() => setShowEntranceModal(true)}>Entrada</Button>
                        </Col>
                        <Col md={1} sm={1}>
                            <Button className="inputs-btn" onClick={() => setShowWithdrawalModal(true)}>Saída</Button>
                        </Col >
                        <Col md={2} sm={2}>
                            <Button className="inputs-btn" onClick={() => setShowSeedsTreatment(true)}>Tratar Sementes</Button>
                        </Col>
                        <Col md={6} sm={5}>
                            <Form>
                                <Form.Control type="text" style={{ backgroundColor: "transparent", borderColor: '#4F9D24', borderRadius: '100px' }} placeholder="Pesquisar" onChange={(e) => setFindTerm(e.target.value)}></Form.Control>
                            </Form>
                        </Col>
                    </Row>
                    <div style={{ maxHeight: '60vh', overflowY: 'scroll', marginTop: '5%' }}>
                        <Table striped bordered hover>
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
                                {products.map((input: Product, index) => {
                                    return <tr key={index}>
                                        <td>{ input.product?.class === 'SEMENTE' ? input?.product?.name + ' ' +  input?.treatment : input?.product?.name }</td>
                                        <td>{input?.product?.class}</td>
                                        <td>
                                            <Row>
                                                <Col md={10}>
                                                    {input?.quantityInDecimal!} {input.measure_unit}
                                                </Col>
                                                <Col md={2}>
                                                    <FontAwesomeIcon icon={faEye} style={{ color: '#000AFF', cursor: 'pointer' }} onClick={() => {
                                                        setShowHistoryModal(true);
                                                        setHistorySelectedProduct(input);
                                                    }}></FontAwesomeIcon>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>{((input.total_price!/100) / input.quantityInDecimal!).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</td>
                                        <td>{(input.total_price!/100).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</td>
                                    </tr>
                                })}

                            </tbody>
                        </Table>
                    </div>

                </Card.Title>
            </Card>
            <HistoryModal show={showHistoryModal} product={historySelectedProduct} handleClose={() => {
                setShowHistoryModal(false);
                setHistorySelectedProduct(new Product());
            }}></HistoryModal>
            <EntranceModal show={showEntranceModal} handleClose={() => setShowEntranceModal(false)}></EntranceModal>
            <WithdrawalModal show={showWithdrawalModal} handleClose={() => setShowWithdrawalModal(false)}></WithdrawalModal>
            <SeedsTreatment show={showSeedsTreatment} handleClose={() => setShowSeedsTreatment(false)}></SeedsTreatment>
        </div >
    )
}