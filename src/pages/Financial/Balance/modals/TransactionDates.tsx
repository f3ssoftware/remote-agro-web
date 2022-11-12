import { pt } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

export function TransactionDates({ show, handleClose, onUpdate }: { show: boolean, handleClose: any, onUpdate: any }) {
    const [startDate, setStartDate] = useState(new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1));
    const [endDate, setEndDate] = useState(new Date(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0));

    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title>Datas</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>De</Form.Label>
                        <DatePicker selected={startDate} onChange={(date: any) => {
                            setStartDate(date);
                        }} locale={pt} dateFormat="dd/MM/yyyy" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Até</Form.Label>
                        <DatePicker selected={endDate} onChange={(date: any) => {
                            setEndDate(date);
                        }} locale={pt} dateFormat="dd/MM/yyyy" />
                    </Form.Group>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Button variant="danger" onClick={handleClose}>
                Cancelar
            </Button>
            <Button variant="success" onClick={() => onUpdate(startDate, endDate)}>
                Registrar
            </Button>
        </Modal.Footer>
    </Modal>
}