import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {
  asyncDeleteGood,
  asyncFetchGoods,
} from '../../../../stores/maintenance.store'
import { Dialog } from 'primereact/dialog'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../../utils/modal-style.util'

export function DeleteConfirmationModal({
  show,
  handleClose,
  id,
}: {
  show: boolean
  handleClose: any
  id: number
}) {
  const dispatch = useDispatch<any>()

  const deleteGoods = (id: number) => {
    dispatch(asyncDeleteGood(id))
    dispatch(asyncFetchGoods)
  }

  return (
    <Dialog
      header="Confirmar exclusão?"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      {' '}
      <Button
        variant="success"
        onClick={() => {
          handleClose()

          deleteGoods(id)
        }}
      >
        Confirmar
      </Button>
      <Button variant="danger" onClick={handleClose}>
        Cancelar
      </Button>
    </Dialog>
    // <Modal show={show} onHide={handleClose} backdrop={'static'} size={'xl'}>
    //   <Modal.Header
    //     closeButton
    //     style={{ backgroundColor: '#7C5529', border: 'none' }}
    //   >
    //     <Modal.Title>
    //       {' '}
    //       <span style={{ color: '#fff' }}>Confirmar exclusão?</span>
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body style={{ backgroundColor: '#7C5529' }}>

    //   </Modal.Body>
    //   <Modal.Footer style={{ backgroundColor: '#7C5529', border: 'none' }}>
    //   </Modal.Footer>
    // </Modal>
  )
}
