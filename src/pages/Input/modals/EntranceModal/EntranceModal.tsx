import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import "./EntranceModal.scss";

import "react-datepicker/dist/react-datepicker.css";
import { NewProduct } from "../components/NewProduct";

export function EntranceModal({ show, handleClose }: { show: boolean, handleClose: any }) {
    const [showNewProduct, setShowNewProduct] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Modal show={show} onHide={handleClose} size={'xl'}>
            <Modal.Header closeButton style={{ backgroundColor: "#7C5529" }}>
                <Modal.Title> <span style={{ color: '#fff' }}>Entrada de estoque</span></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#7C5529" }}>
                <NewProduct modal={'ENTRANCE'}></NewProduct>
            </Modal.Body>
        </Modal >
    );
}