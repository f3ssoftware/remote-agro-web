import { Dialog } from 'primereact/dialog'
import { NewTransferWeighing } from '../components/NewTransferWeighing'
import { dialogContentSyle, dialogHeaderStyle } from '../../../../utils/modal-style.util'

export function TransferWeighingModal({
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
      header="Transferência de Silo"
      visible={show}
      style={{ width: '50vw' }}
      onHide={() => handleClose()}
    >
      <NewTransferWeighing
        show={false}
        handleClose={handleClose}
      ></NewTransferWeighing>
    </Dialog>
  )
  {
    /* <Modal show={show} onHide={handleClose} backdrop = {'static'}  size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Transferência de Silo</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <TransferWeighing show={false} handleClose={handleClose}></TransferWeighing>
        </Modal.Body>
    </Modal > */
  }
}
