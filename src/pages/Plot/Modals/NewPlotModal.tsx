import { Button, Modal } from "react-bootstrap";
import { NewPlot } from "../components/NewPlot";

export function NewPlotModal({show, handleClose}: {show: boolean, handleClose: any}){

    const register = () => {
        console.log('teste botão')
    }

    return <Modal show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Cadastro de novo talhão</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <NewPlot></NewPlot>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
                <Button variant="success" onClick={() => {register(); handleClose();}}>Cadastrar</Button>
            </div>
        </Modal.Body>
    </Modal >
}