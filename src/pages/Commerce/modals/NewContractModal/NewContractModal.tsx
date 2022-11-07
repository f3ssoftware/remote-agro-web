import { Button, Modal } from "react-bootstrap"
import { NewContract } from "../components/NewContract"

export function NewContractModal({show, handleClose}: {show: boolean, handleClose: any}){

    const register = () => {
        console.log('teste botão')
    }

    return <Modal show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Editar contrato</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
    
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
                <Button variant="success" onClick={() => register()}>Registrar</Button>
            </div>
        </Modal.Body>
    </Modal >
}