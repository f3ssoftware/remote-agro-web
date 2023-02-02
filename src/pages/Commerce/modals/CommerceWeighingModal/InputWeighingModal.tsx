import { Button, Modal } from "react-bootstrap"
import { InputWeighing } from "../components/InputWeighing"

export function InputWeighingModal({show, handleClose}: {show: boolean, handleClose: any}){


    return <Modal show={show} onHide={handleClose} backdrop = {'static'}  size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Pesagem Entrada</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <InputWeighing show={false} handleClose={handleClose}></InputWeighing>
        </Modal.Body>
    </Modal >
}