import { Button, Modal } from "react-bootstrap";
import { NewEditPlot } from "../components/NewEditPlot";

export function NewEditPlotModal({show, handleClose}: {show: boolean, handleClose: any}){



    return <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Edição de talhão</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <NewEditPlot></NewEditPlot>
        </Modal.Body>
    </Modal >
}