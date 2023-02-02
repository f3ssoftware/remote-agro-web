import { Button, Modal } from "react-bootstrap"
import { OutputWeighing } from "../components/OutputWeighing"

export function OutputWeighingModal({show, handleClose}: {show: boolean, handleClose: any}){


    return <Modal show={show} onHide={handleClose} backdrop = {'static'}  size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Pesagem de Saída</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <OutputWeighing show={false} handleClose={handleClose}></OutputWeighing>
        </Modal.Body>
    </Modal >
}