import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import { Product } from "../../../../models/Product";




export function PartHistoryModal({ show, handleClose }: { show: boolean, handleClose: any }) {
    const { input, loading } = useSelector((state: RootState) => state);
    const [history, setHistory] = useState(input.productHistory);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (show) {
            // dispatch(asyncFetchProductHistory(product.id!))
        }
    }, [show]);

    // useEffect(() => {
    //     const newHistory = [...input.productHistory];
    //     newHistory.sort((h1: History, h2: History) => {
    //         if (h1.createdAt! > h2.createdAt!) {
    //             return -1;
    //         }

    //         if (h1.createdAt! < h2.createdAt!) {
    //             return 1;
    //         }

    //         return 0;
    //     });
    //     setHistory(newHistory);
    // }, [input])

    return <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Histórico - </span></Modal.Title>
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
                        
                    </tbody>
                </Table> : <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
            </div>

        </Modal.Body>
    </Modal >
}