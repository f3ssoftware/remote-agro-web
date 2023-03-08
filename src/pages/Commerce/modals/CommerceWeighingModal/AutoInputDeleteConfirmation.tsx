import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { asyncDeleteInputWeighing, removeInputWeighRow } from '../../../../stores/commerce.store'


export function AutoInputDeleteConfirmation({
  show,
  handleClose,
  id,
  index
}: {

  show: boolean
  handleClose: any
  id: number
  index: number
}) {
  const dispatch = useDispatch<any>();

  const deleteAutoInputWeighing = (id: number) => {
    if (id) {
      dispatch(asyncDeleteInputWeighing(id, index));
    } else {
      dispatch(removeInputWeighRow({ index }));
    }

  }

  return (
    <Modal show={show} onHide={handleClose} backdrop={'static'} size={'xl'}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: '#7C5529', border: 'none' }}
      >
        <Modal.Title>
          {' '}
          <span style={{ color: '#fff' }}>Confirmar exclusão?</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#7C5529' }}>

      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#7C5529', border: 'none' }}>
        {' '}
        <Button
          variant="success"
          onClick={() => {
            handleClose()
            deleteAutoInputWeighing(id)
          }}
        >
          Confirmar
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}


