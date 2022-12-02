import { Button, Modal } from "react-bootstrap"
import { NewCommercePlot } from "../components/NewCommercePlot"

export function NewCommercePlotModal({show, handleClose}: {show: boolean, handleClose: any}){

    const register = () => {
        console.log('teste botão')
    }

    return <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'sm'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Editar Silo</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <NewCommercePlot></NewCommercePlot>
        </Modal.Body>
    </Modal >
}