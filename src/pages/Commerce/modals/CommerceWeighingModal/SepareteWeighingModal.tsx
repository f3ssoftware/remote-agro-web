import { Button, Modal } from "react-bootstrap"
import { SepareteWeighing } from "../components/SepareteWeighing"

export function SepareteWeighingModal({show, handleClose}: {show: boolean, handleClose: any}){


    return <Modal show={show} onHide={handleClose} backdrop = {'static'}  size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Pesagem Avulsa</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <SepareteWeighing show={false} handleClose={handleClose}></SepareteWeighing>
        </Modal.Body>
    </Modal >
}