import { Button, Modal } from 'react-bootstrap'
import { EditPlot } from '../components/EditPlot'
import { Dialog } from 'primereact/dialog'
import { dialogContentSyle, dialogHeaderStyle } from '../../../utils/modal-style.util'

export function EditPlotModal({
  show,
  handleClose,
  id,
}: {
  id: number
  show: boolean
  handleClose: any
}) {
  return (
    <Dialog
      header="Edição de talhão"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <EditPlot id={id} handleClose={handleClose}></EditPlot>
    </Dialog>
    // <Modal backdrop={'static'} show={show} onHide={handleClose} size={'xl'}>
    //   <Modal.Header
    //     closeButton
    //     style={{ backgroundColor: '#7C5529', border: 'none' }}
    //   >
    //     <Modal.Title>
    //       {' '}
    //       <span style={{ color: '#fff' }}>Edição de talhão</span>
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body style={{ backgroundColor: '#7C5529' }}>
    //   </Modal.Body>
    // </Modal>
  )
}
