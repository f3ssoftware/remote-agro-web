import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import { Part } from "../../../../models/Part";
import { PartHistory } from "../../../../models/PartHistory";
import { asyncFetchPartHistory } from "../../../../stores/maintenance.store";




export function PartHistoryModal({ show, handleClose, part }: { show: boolean, handleClose: any, part: Part }) {
    const { maintenance, loading } = useSelector((state: RootState) => state);
    const [partHistory, setPartHistory] = useState(maintenance.partHistory);
    const dispatch = useDispatch<any>();

    useEffect(()=>{
        setPartHistory(maintenance.partHistory)
        },[maintenance])

        
    useEffect(() => {
        if (show) {
            dispatch(asyncFetchPartHistory(part.id!))
        }
    }, [show]);

    useEffect(() => {
        const newPartHistory = [...maintenance.partHistory];
        newPartHistory.sort((h1: PartHistory, h2: PartHistory) => {
            if (h1.createdAt! > h2.createdAt!) {
                return -1;
            }

            if (h1.createdAt! < h2.createdAt!) {
                return 1;
            }

            return 0;
        });
        setPartHistory(newPartHistory);
    }, [maintenance])

    return <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Histórico - {part.name} </span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <div style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
                {loading.requests.filter(r => r === 'parts').length === 0 ? <Table striped hover>
                    <thead style={{ backgroundColor: '#243C74', color: '#fff', border: 'none' }}>
                        <tr>
                            <th>Tipo</th>
                            <th>Data</th>
                            <th>Responsável</th>
                            <th>Quantidade</th>
                            <th>Bem</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                    {partHistory?.map((h: PartHistory, index) => {
                            return (<tr key={index}>
                                <td>{h?.type}</td>
                                <td>{new Date(h?.createdAt!).toLocaleDateString('pt-BR')}</td>
                                <td>{h?.accountable}</td>
                                <td>{h?.quantity!}</td>
                                <td>{h?.good_name}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table> : <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
            </div>

        </Modal.Body>
    </Modal >
}