import { Modal, Button } from "react-bootstrap";
import { CreateBankAccount } from "../components/CreateBankAccount";

export function CreateBankAccountModal({ show, handleClose}: { show: boolean, handleClose: any}) {

    return <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'sm'}>
    <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
        <Modal.Title> <span style={{ color: '#fff' }}>Nova conta</span></Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ backgroundColor: "#7C5529" }}>
        <CreateBankAccount handleClose={handleClose}></CreateBankAccount>
    </Modal.Body>
</Modal >
}