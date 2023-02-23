import { useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";

export function EventModal({ show, handleClose, serviceOrder }: { show: boolean, handleClose: any, serviceOrder: any }) {
    useEffect(() => {
        console.log(serviceOrder);
    }, [serviceOrder]);
    return (
        <Modal backdrop={'static'} show={show} onHide={handleClose} size={'sm'}>
            <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
                <Modal.Title> <span style={{ color: '#fff' }}>{serviceOrder.title}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#7C5529" }}>
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    )
}