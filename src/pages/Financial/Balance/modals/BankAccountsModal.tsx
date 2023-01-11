import { Modal } from "react-bootstrap";
import { CreateBankAccount } from "../components/CreateBankAccount";
import { BankAccounts } from "../components/BankAccounts";
import { TotalBalance } from "../components/TotalBalance";

export function BankAccountsModal({ show, handleClose }: { show: boolean, handleClose: any }) {
    return <Modal backdrop={'static'} show={show} onHide={handleClose} size={'lg'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Contas bancárias</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            {/* <CreateBankAccount handleClose={handleClose}></CreateBankAccount> */}
            <div style={{ color: '#FFF' }}>
                Total:
                <TotalBalance></TotalBalance>
            </div>
            <BankAccounts></BankAccounts>
        </Modal.Body>
    </Modal >
}
