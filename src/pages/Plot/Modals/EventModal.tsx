import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../..";

export function EventModal({ show, handleClose, application }: { show: boolean, handleClose: any, application: any }) {
    const { plot } = useSelector((state: RootState) => state);
    const [index, setIndex] = useState(0);
    // useEffect(() => {
        
    // }, [application]);
    useEffect(() => {
        setIndex(plot?.applications?.findIndex(app => application?.id === app?.id));
    }, [application]);

    return (
        <Modal backdrop={'static'} show={show} onHide={handleClose} size={'sm'}>
            <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
                <Modal.Title> <span style={{ color: '#fff' }}>{application?.id}, {index} - {plot?.applications[index]?.type}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#7C5529" }}>
                <Row>
                    <Col>
                        Teste: {plot?.applications[index]?.name}
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    )
}