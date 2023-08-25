import { Button, Modal } from 'react-bootstrap'

import { useDispatch } from 'react-redux'
import { asyncDeleteSilo, asyncFetchSiloData } from '../../../stores/commerce.store'

export function PlotDeleteConfirmation({
  show,
  handleClose,
  id,
}: {
  show: boolean
  handleClose: any
  id: number
}) {
  const dispatch = useDispatch<any>()

  const deleteSilo = (id: number) => {
    dispatch(asyncDeleteSilo(id))
    dispatch(asyncFetchSiloData)
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
      <Modal.Body style={{ backgroundColor: '#7C5529' }}></Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#7C5529', border: 'none' }}>
        {' '}
        <Button
          variant="success"
          onClick={() => {
            handleClose()
            deleteSilo(id)
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
