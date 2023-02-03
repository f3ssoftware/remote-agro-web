import { Button, Modal } from "react-bootstrap"
import { TransferWeighing } from "../components/TransferWeighing"

export function TransferWeighingModal({show, handleClose}: {show: boolean, handleClose: any}){


    return <Modal show={show} onHide={handleClose} backdrop = {'static'}  size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Transferência de Silo</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <TransferWeighing show={false} handleClose={handleClose}></TransferWeighing>
        </Modal.Body>
    </Modal >
}