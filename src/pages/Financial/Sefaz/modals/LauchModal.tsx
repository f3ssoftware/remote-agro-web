import { Modal } from "react-bootstrap";
import { ManualRegistration } from "../../ManualRegistration/ManualRegistration";

export function LaunchModal({ show, handleClose, sefaz }: { show: boolean, handleClose: any, sefaz?: any }) {
    return <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'lg'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Cadastro Manual</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <ManualRegistration sefaz={sefaz}></ManualRegistration>
        </Modal.Body>
    </Modal >
}