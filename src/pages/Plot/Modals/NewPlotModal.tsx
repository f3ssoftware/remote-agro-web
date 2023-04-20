import { Button, Modal } from "react-bootstrap";
import { NewPlot } from "../components/NewPlot";

export function NewPlotModal({show, handleClose}: {show: boolean, handleClose: any}){



    return <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Cadastro de novo talhão</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <NewPlot></NewPlot>
        </Modal.Body>
    </Modal >
}