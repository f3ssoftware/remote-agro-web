import { Button, Modal } from "react-bootstrap"
import { NewContract } from "../components/NewContract"

export function NewContractModal({show, handleClose}: {show: boolean, handleClose: any}){


    return <Modal show={show} onHide={handleClose} backdrop = {'static'}  size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Editar contrato</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <NewContract show={false} handleClose={undefined}></NewContract>
        </Modal.Body>
    </Modal >
}