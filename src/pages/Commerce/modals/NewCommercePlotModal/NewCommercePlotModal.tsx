import { Button, Modal } from 'react-bootstrap'
import { NewCommercePlot } from '../components/NewCommercePlot'
import { Dialog } from 'primereact/dialog'
import { dialogContentSyle, dialogHeaderStyle } from '../../../../utils/modal-style.util'

export function NewCommercePlotModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  return (
    <Dialog
    headerStyle={dialogHeaderStyle}
    contentStyle={dialogContentSyle}
      header="Novo silo"
      visible={show}
      style={{ width: '50vw' }}
      onHide={() => handleClose()}
    >
      <NewCommercePlot handleClose={handleClose}></NewCommercePlot>
    </Dialog>
  )
  {
    /* <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'sm'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Editar Silo</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <NewCommercePlot handleClose={handleClose}></NewCommercePlot>
        </Modal.Body>
    </Modal > */
  }
}
