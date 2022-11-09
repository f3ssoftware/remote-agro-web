import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../..";
import { History } from "../../../models/History";
import { Product } from "../../../models/Product";
import { asyncFetchProductHistory } from "../../../stores/input.store";
import { currencyFormat } from "../../../utils/currencyFormat";

export function HistoryModal({ show, product, handleClose }: { show: boolean, product: Product, handleClose: any }) {
    const { input, loading } = useSelector((state: RootState) => state);
    const [history, setHistory] = useState(input.productHistory);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (show) {
            dispatch(asyncFetchProductHistory(product.id!))
        }
    }, [show]);

    useEffect(() => {
        setHistory(input.productHistory);
    }, [input])

    return <Modal show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Histórico - {product.product?.name}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <div style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
                {loading.requests.filter(r => r === 'product-flows-by-user-product').length === 0 ? <Table striped hover>
                    <thead style={{ backgroundColor: '#243C74', color: '#fff', border: 'none' }}>
                        <tr>
                            <th>Tipo</th>
                            <th>Data</th>
                            <th>Responsável</th>
                            <th>Quantidade</th>
                            <th>Observações</th>
                            <th>Custo Total</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                        {history.map((history: History, index) => {
                            return <tr key={index}>
                                <td>{history?.flow_type}</td>
                                {/* <td></td> */}
                                <td>{`${new Date(history.createdAt!)?.getDay()!}/${new Date(history?.createdAt!).getMonth()! + 1}/${new Date(history?.createdAt!).getFullYear()!}`}</td>
                                <td>{history?.accountable}</td>
                                <td>{history?.quantity}</td>
                                <td>{history?.observations}</td>
                                <td>{history?.price?.toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</td>
                            </tr>
                        })}
                    </tbody>
                </Table> : <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
            </div>

        </Modal.Body>
    </Modal >
}