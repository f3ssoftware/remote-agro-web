import { useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";

export function EventModal({ show, handleClose, application }: { show: boolean, handleClose: any, application: any }) {
    // useEffect(() => {
        
    // }, [application]);
    useEffect(() => {

    }, []);

    return (
        <Modal backdrop={'static'} show={show} onHide={handleClose} size={'sm'}>
            <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
                <Modal.Title> <span style={{ color: '#fff' }}>{application?.title}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#7C5529" }}>
                <Row>
                    <Col>
                        Teste: {application?.fields?.name}
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    )
}