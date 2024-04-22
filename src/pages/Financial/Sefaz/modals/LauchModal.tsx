import { Modal } from 'react-bootstrap'
import { ManualRegistration } from '../../ManualRegistration/ManualRegistration'
import { Dialog } from 'primereact/dialog'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../../utils/modal-style.util'

export function LaunchModal({
  show,
  handleClose,
  sefaz,
}: {
  show: boolean
  handleClose: any
  sefaz?: any
}) {
  return (
    <Dialog
      header="Cadastro Manual"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <ManualRegistration sefaz={sefaz}></ManualRegistration>
    </Dialog>
    // <Modal backdrop={'static'} show={show} onHide={handleClose} size={'lg'}>
    //   <Modal.Header
    //     closeButton
    //     style={{ backgroundColor: '#7C5529', border: 'none' }}
    //   >
    //     <Modal.Title>
    //       {' '}
    //       <span style={{ color: '#fff' }}>Cadastro Manual</span>
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body style={{ backgroundColor: '#7C5529' }}>
    //   </Modal.Body>
    // </Modal>
  )
}
