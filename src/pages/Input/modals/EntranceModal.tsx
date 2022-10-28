import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';


import "react-datepicker/dist/react-datepicker.css";

export function EntranceModal({ show, handleClose }: { show: boolean, handleClose: any }) {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Modal show={show} onHide={handleClose} size={'xl'}>
            <Modal.Header closeButton style={{ backgroundColor: "#7C5529" }}>
                <Modal.Title> <span style={{ color: '#fff' }}>Entrada de estoque</span></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#7C5529" }}>
                <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} locale={pt} dateFormat="dd/MM/yyyy" />
            </Modal.Body>
        </Modal >
    );
}