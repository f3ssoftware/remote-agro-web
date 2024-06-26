import { useEffect, useState } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import {
  asyncConciliateExpense,
  asyncFetchBankAccountsData,
  asyncFetchExpensesAndRevenues,
  asyncFilterByButton,
  asyncPayContract,
  asyncPayExpense,
} from '../../../../stores/financial.store'
import { Dialog } from 'primereact/dialog'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../../utils/modal-style.util'

export function PayExpenseModal({
  show,
  handleClose,
  expenseId,
  contractId,
  amount,
  expensesRevenuesId,
}: {
  show: boolean
  handleClose: any
  expenseId: number
  contractId: number
  amount: number
  expensesRevenuesId: number
}) {
  const [bankAccountId, setBankAccountId] = useState(0)
  const { financial, seasons } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()

  const payExpense = async () => {
    if (expenseId && expenseId !== 0) {
      dispatch(
        asyncPayExpense(
          expenseId,
          bankAccountId,
          seasons.selectedSeason.id,
          amount,
          expensesRevenuesId,
        ),
      )
    }

    if (contractId && contractId !== 0) {
      dispatch(asyncPayContract(contractId, bankAccountId, amount * 100))
    }

    await dispatch(asyncFetchBankAccountsData())
    await dispatch(
      asyncFilterByButton(
        financial.activeCard,
        financial.filterDates.startDate,
        financial.filterDates.endDate,
      ),
    )
    handleClose()
  }

  useEffect(() => {
    dispatch(asyncFetchBankAccountsData())
  }, [])

  return (
    <Dialog
      header="Nota"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Conta bancária</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                setBankAccountId(Number(e.target.value))
              }}
            >
              <option value={0}></option>
              {financial.bankAccounts.map((bankAccount, index) => {
                return (
                  <option key={index} value={bankAccount.id}>
                    {bankAccount.nickname}
                  </option>
                )
              })}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Button variant="danger" onClick={handleClose}>
        Cancelar
      </Button>
      <Button
        variant="success"
        onClick={() => payExpense()}
        disabled={bankAccountId === 0}
      >
        Registrar
      </Button>
    </Dialog>
    // <Modal backdrop={'static'} show={show} onHide={handleClose}>
    //   <Modal.Header
    //     closeButton
    //     style={{ backgroundColor: '#7C5529', border: 'none' }}
    //   >
    //     <Modal.Title>Modal heading</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body style={{ backgroundColor: '#7C5529' }}>
    //   </Modal.Body>
    //   <Modal.Footer style={{ backgroundColor: '#7C5529', border: 'none' }}>
    //   </Modal.Footer>
    // </Modal>
  )
}
