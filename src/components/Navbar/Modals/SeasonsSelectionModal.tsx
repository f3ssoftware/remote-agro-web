import { Button, Modal } from "react-bootstrap";
import { NewSeasonsSelection } from "../NewSeasonsSelection";


export function SeasonsSelectionModal({show, handleClose}: {show: boolean, handleClose: any}){
    return <Modal show={show} onHide={handleClose} size={'xl'}>
    <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
        <Modal.Title> <span style={{ color: '#fff' }}>Nova Temporada</span></Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ backgroundColor: "#7C5529" }}>
        <NewSeasonsSelection></NewSeasonsSelection>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
            <Button style={{color: '#000'}} variant="success" onClick={() => { handleClose();}}>Confirmar</Button>
        </div>
    </Modal.Body>
</Modal >
}