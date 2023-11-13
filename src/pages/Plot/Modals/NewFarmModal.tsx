import { Button, Modal } from "react-bootstrap";
import { NewFarm } from "../components/NewFarm";

export function NewFarmModal({show, handleClose}: {show: boolean, handleClose: any}){



    return <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Cadastro de nova propriedade</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <NewFarm handleClose={handleClose}></NewFarm>
        </Modal.Body>
    </Modal >
}