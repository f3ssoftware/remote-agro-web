import { Button, Modal } from 'react-bootstrap'
import { EditContract } from '../components/EditContract'
import { Dialog } from 'primereact/dialog'
import { dialogContentSyle, dialogHeaderStyle } from '../../../../utils/modal-style.util'

export function EditContractModal({
  show,
  handleClose,
  id,
}: {
  show: boolean
  handleClose: any
  id: number
}) {
  return (
    <Dialog
      header="Editar contrato"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <EditContract
        show={false}
        handleClose={handleClose}
        id={id}
      ></EditContract>
    </Dialog>
  )
  // <Modal show={show} onHide={handleClose} backdrop = {'static'}  size={'xl'}>
  //     <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
  //         <Modal.Title> <span style={{ color: '#fff' }}>Editar contrato</span></Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body style={{ backgroundColor: "#7C5529" }}>
  //     </Modal.Body>
  // </Modal >
}
