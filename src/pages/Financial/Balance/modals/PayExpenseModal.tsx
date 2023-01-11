import { useEffect, useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import { asyncConciliateExpense, asyncFetchBankAccountsData, asyncPayContract, asyncPayExpense } from "../../../../stores/financial.store";

export function PayExpenseModal({ show, handleClose, expenseId, contractId, amount }: { show: boolean, handleClose: any, expenseId: number, contractId: number, amount: number }) {
    const [bankAccountId, setBankAccountId] = useState(0);
    const { financial, seasons } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();

    const payExpense = async () => {
        if (expenseId && expenseId !== 0) {
            dispatch(asyncPayExpense(expenseId, bankAccountId, seasons.selectedSeason.id, amount))
        }

        if (contractId && contractId !== 0) {
            dispatch(asyncPayContract(contractId, bankAccountId, amount*100));
        }

        await dispatch(asyncFetchBankAccountsData());
        handleClose();
    }

    useEffect(() => {
        dispatch(asyncFetchBankAccountsData());
    }, [])

    return <Modal backdrop={'static'} show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Conta bancária</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e) => {
                            setBankAccountId(Number(e.target.value));
                        }}>
                            <option value={0}></option>
                            {financial.bankAccounts.map((bankAccount, index) => {
                                return <option key={index} value={bankAccount.id}>{bankAccount.nickname}</option>;
                            })}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Button variant="danger" onClick={handleClose}>
                Cancelar
            </Button>
            <Button variant="success" onClick={() => payExpense()} disabled={bankAccountId === 0}>
                Registrar
            </Button>
        </Modal.Footer>
    </Modal>
}