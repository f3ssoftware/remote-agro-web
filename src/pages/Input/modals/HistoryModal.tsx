import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../..";
import { History } from "../../../models/History";
import { Product } from "../../../models/Product";
import { asyncFetchProductHistory } from "../../../stores/input.store";
import { currencyFormat } from "../../../utils/currencyFormat";

export function HistoryModal({ show, product, handleClose }: { show: boolean, product: Product, handleClose: any }) {
    const { input } = useSelector((state: RootState) => state);
    const [history, setHistory] = useState(input.productHistory);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (show) {
            dispatch(asyncFetchProductHistory(product.id!))
            setHistory(input.productHistory);
        }
    }, [show]);

    return <Modal show={show} onHide={handleClose} size={'lg'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529" }}>
            <Modal.Title>Histórico - {product.product?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <Table striped bordered hover>
                <thead style={{ backgroundColor: '#243C74', color: '#fff', border: 'none' }}>
                    <tr>
                        <th>Tipo</th>
                        <th>Data</th>
                        <th>Responsável</th>
                        <th>Quantidade</th>
                        <th>Observações</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                    {history.map((history: History, index) => {
                        return <tr key={index}>
                            <td>{history?.flow_type}</td>
                            <td>{history?.createdAt?.toLocaleString()}</td>
                            <td>{history?.accountable}</td>
                            <td>{history?.quantity}</td>
                            <td>{history?.observations}</td>
                        </tr>
                    })}
                    {/* {products.map((input: Product) => {
                        return <tr>
                            <td>{input?.product?.name}</td>
                            <td>{input?.product?.class}</td>
                            <td>
                                <Row>
                                    <Col md={10}>
                                        {input?.quantityInDecimal} {input.measure_unit}
                                    </Col>
                                    <Col md={2}>
                                        <FontAwesomeIcon icon={faEye} style={{ color: '#000AFF', cursor: 'pointer' }} onClick={() => {
                                            setShowHistoryModal(true);
                                            setHistorySelectedProduct(input);
                                        }}></FontAwesomeIcon>
                                    </Col>
                                </Row>
                            </td>
                            <td>{`${currencyFormat((input.total_price! / input.quantityInDecimal!) / 100)}`}</td>
                            <td>{currencyFormat(input.total_price! / 100)}</td>
                        </tr>
                    })} */}

                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#7C5529" }}>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal >
}