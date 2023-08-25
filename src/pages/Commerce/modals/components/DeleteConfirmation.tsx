import { Button, Modal } from 'react-bootstrap'
import { asyncFetchContractsData } from '../../../../stores/financial.store'
import { useDispatch } from 'react-redux'
import { asyncDeleteContract, asyncDeleteSilo, asyncFetchSiloData } from '../../../../stores/commerce.store'


export function DeleteConfirmation({
  show,
  handleClose,
  id
}: {

  show: boolean
  handleClose: any
  id: number
}) {
    const dispatch = useDispatch<any>();

    const deleteContract = (id: number) => {
      dispatch(asyncDeleteContract(id))
      dispatch(asyncFetchContractsData)
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
        
                deleteContract(id)
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


