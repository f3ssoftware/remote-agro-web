import { Button, Modal } from 'react-bootstrap'
import { asyncDeleteExpense, asyncFetchBankAccountsData, asyncFetchExpensesAndRevenues } from '../../../../stores/financial.store'
import { useDispatch } from 'react-redux'


export function DeleteConfirmationModal({
  show,
  handleClose,
  id
}: {

  show: boolean
  handleClose: any
  id: number
}) {
    const dispatch = useDispatch<any>();
    
    const deleteExpense = (id: number) => {
        dispatch(asyncDeleteExpense(id));
        dispatch(asyncFetchBankAccountsData);
        dispatch(asyncFetchExpensesAndRevenues);
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
                deleteExpense(id)
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


