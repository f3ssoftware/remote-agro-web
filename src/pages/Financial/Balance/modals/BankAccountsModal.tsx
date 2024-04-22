import { Modal } from 'react-bootstrap'
import { CreateBankAccount } from '../components/CreateBankAccount'
import { BankAccounts } from '../components/BankAccounts'
import { TotalBalance } from '../components/TotalBalance'
import { Dialog } from 'primereact/dialog'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../../utils/modal-style.util'

export function BankAccountsModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  return (
    <Dialog
      header="Contas bancárias"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <div style={{ color: '#FFF' }}>
        Total:
        <TotalBalance></TotalBalance>
      </div>
      <BankAccounts></BankAccounts>
    </Dialog>
    // <Modal backdrop={'static'} show={show} onHide={handleClose} size={'lg'}>
    //   <Modal.Header
    //     closeButton
    //     style={{ backgroundColor: '#7C5529', border: 'none' }}
    //   >
    //     <Modal.Title>
    //       {' '}
    //       <span style={{ color: '#fff' }}>Contas bancárias</span>
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body style={{ backgroundColor: '#7C5529' }}>
    //     {/* <CreateBankAccount handleClose={handleClose}></CreateBankAccount> */}
    //   </Modal.Body>
    // </Modal>
  )
}
