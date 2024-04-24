import { Button, Modal } from 'react-bootstrap'
import {
  asyncDeleteExpense,
  asyncFetchBankAccountsData,
  asyncFetchContractsData,
  asyncFetchExpensesAndRevenues,
} from '../../../../stores/financial.store'
import { useDispatch } from 'react-redux'
import { asyncDeleteContract } from '../../../../stores/commerce.store'
import { Dialog } from 'primereact/dialog'
import { dialogContentSyle, dialogHeaderStyle } from '../../../../utils/modal-style.util'

export function DeleteConfirmationModal({
  show,
  handleClose,
  id,
  id2,
}: {
  show: boolean
  handleClose: any
  id: number
  id2: number
}) {
  const dispatch = useDispatch<any>()

  const deleteExpense = (id: number) => {
    dispatch(asyncDeleteExpense(id))
    dispatch(asyncFetchBankAccountsData())
    // dispatch(asyncFetchExpensesAndRevenues());
  }

  const deleteContract = (id2: number) => {
    dispatch(asyncDeleteContract(id2))
    dispatch(asyncFetchContractsData())
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
          if (id) {
            deleteExpense(id)
          } else {
            deleteContract(id2)
          }
        }}
      >
        Confirmar
      </Button>
      <Button variant="danger"  style={{marginLeft: '2%'}} onClick={handleClose}>
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
    //   <Modal.Body style={{ backgroundColor: '#7C5529' }}></Modal.Body>
    //   <Modal.Footer style={{ backgroundColor: '#7C5529', border: 'none' }}>
    //   </Modal.Footer>
    // </Modal>
  )
}
