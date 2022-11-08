import { Button, Modal } from "react-bootstrap"
/*import { NewCommercePlot } from "../components/NewCommercePlot"*/

export function NewCommercePlotModal({show, handleClose}: {show: boolean, handleClose: any}){

    const register = () => {
        console.log('teste botão')
    }

    return <Modal show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Editar Silo</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
                <Button variant="success" onClick={() => {register(); handleClose();}}>Enviar</Button>
            </div>
        </Modal.Body>
    </Modal >
}