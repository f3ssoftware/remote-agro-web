import './EntranceModal.scss'

import 'react-datepicker/dist/react-datepicker.css'
import { NewProduct } from '../components/NewProduct'
import { Modal } from 'react-bootstrap'
import { Dialog } from 'primereact/dialog'
import { dialogContentSyle, dialogHeaderStyle } from '../../../../utils/modal-style.util'

export function EntranceModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  return (
    <Dialog
      header="Entrada"
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
      visible={show}
      style={{ width: '80vw' }}
      onHide={() => {
        handleClose()
      }}
    >
      <NewProduct
        modal={'ENTRANCE'}
        handleClose={() => handleClose()}
      ></NewProduct>
    </Dialog>
    // <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'xl'}>
    //     <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
    //         <Modal.Title> <span style={{ color: '#fff' }}>Entrada de estoque</span></Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body style={{ backgroundColor: "#7C5529" }}>
    //         <NewProduct modal={'ENTRANCE'} handleClose={() => handleClose()}></NewProduct>
    //     </Modal.Body>
    // </Modal >
  )
}
