import { Modal, Button } from "react-bootstrap";
import { CreateBankAccount } from "../components/CreateBankAccount";

export function CreateBankAccountModal({ show, handleClose}: { show: boolean, handleClose: any}) {
    return <Modal show={show} onHide={handleClose} size={'sm'}>
    <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
        <Modal.Title> <span style={{ color: '#fff' }}>Nova conta</span></Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ backgroundColor: "#7C5529" }}>
        <CreateBankAccount></CreateBankAccount>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
            <Button variant="success" onClick={() => {handleClose()}}>Enviar</Button>
        </div>
    </Modal.Body>
</Modal >
}