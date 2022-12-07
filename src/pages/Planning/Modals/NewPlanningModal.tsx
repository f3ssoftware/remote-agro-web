import { Button, Modal } from "react-bootstrap"
import { NewPlanning } from "../components/NewPlanning"

export function NewPlanningModal({show, handleClose}: {show: boolean, handleClose: any}){


    return <Modal show={show} onHide={handleClose} backdrop = {'static'}  size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Novo Planejamento</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <NewPlanning show={false} handleClose={undefined}></NewPlanning>
        </Modal.Body>
    </Modal >
}