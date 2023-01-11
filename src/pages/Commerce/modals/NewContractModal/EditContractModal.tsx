import { Button, Modal } from "react-bootstrap"
import { EditContract } from "../components/EditContract"

export function EditContractModal({show, handleClose}: {show: boolean, handleClose: any}){


    return <Modal show={show} onHide={handleClose} backdrop = {'static'}  size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Editar contrato</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <EditContract show={false} handleClose={undefined}></EditContract>
        </Modal.Body>
    </Modal >
}