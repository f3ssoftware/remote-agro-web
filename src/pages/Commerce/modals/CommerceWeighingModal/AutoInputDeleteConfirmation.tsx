import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { asyncDeleteInputWeighing } from '../../../../stores/commerce.store'


export function AutoInputDeleteConfirmation({
  show,
  handleClose,
  id,
  onHandleRemove,
  index
}: {

  show: boolean
  handleClose: any
  id: number
  index: number
  onHandleRemove: any
}) {
    const dispatch = useDispatch<any>();

    const deleteAutoInputWeighing = (id: number) => {
      dispatch(asyncDeleteInputWeighing(id)) 
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
                onHandleRemove(index)
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

