import "./EntranceModal.scss";

import "react-datepicker/dist/react-datepicker.css";
import { NewProduct } from "../components/NewProduct";
import { Modal } from "react-bootstrap";

export function EntranceModal({ show, handleClose }: { show: boolean, handleClose: any }) {
    return (
        <Modal show={show} onHide={handleClose} size={'xl'}>
            <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
                <Modal.Title> <span style={{ color: '#fff' }}>Entrada de estoque</span></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#7C5529" }}>
                <NewProduct modal={'ENTRANCE'}></NewProduct>
            </Modal.Body>
        </Modal >
    );
}