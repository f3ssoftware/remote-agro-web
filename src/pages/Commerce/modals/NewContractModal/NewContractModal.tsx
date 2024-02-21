import { Button, Modal } from "react-bootstrap"
import { NewContract } from "../components/NewContract"
import { Dialog } from "primereact/dialog"

export function NewContractModal({ show, handleClose }: { show: boolean, handleClose: any }) {

    return <Dialog headerStyle={{ backgroundColor: '#7C5529', color: '#FFF' }} contentStyle={{ backgroundColor: '#7C5529' }} header="Novo contrato" visible={show} style={{ width: '50vw' }} onHide={() => handleClose()}>
        <NewContract show={false} handleClose={handleClose}></NewContract>
    </Dialog>
    // return <Modal show={show} onHide={handleClose} backdrop = {'static'}  size={'xl'}>
    //     <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
    //         <Modal.Title> <span style={{ color: '#fff' }}>Novo contrato</span></Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body style={{ backgroundColor: "#7C5529" }}>
    //         <NewContract show={false} handleClose={handleClose}></NewContract>
    //     </Modal.Body>
    // </Modal >
}