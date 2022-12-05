import { faCalendar, faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { start } from "repl";
import { RootState } from "../../../..";
import { ExpensesRevenue } from "../../../../models/ExpensesRevenue";
import { asyncConciliateExpense, asyncDeleteExpense, asyncFetchBankAccountsData, asyncFetchExpensesAndRevenues, asyncPayExpense } from "../../../../stores/financial.store";
import { getMessages } from "../../../../stores/messaging.store";
import { PayExpenseModal } from "../modals/PayExpenseModal";
import { TransactionDates } from "../modals/TransactionDates";

const initialTransactions: ExpensesRevenue[] = []
export function Transactions() {
    const { financial, seasons } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();
    const [showModalPayExpense, setShowModalPayExpense] = useState(false);
    const [expenseId, setExpenseId] = useState(0);
    const [startDate, setStartDate] = useState(new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1));
    const [endDate, setEndDate] = useState(new Date(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0));
    const [showModalDates, setShowModalDates] = useState(false);
    const [findTransaction, setFindTransaction] = useState('');
    const [transactions, setTransactions] = useState(initialTransactions);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [contractId, setContractId] = useState(0);

    useEffect(() => {
        dispatch(asyncFetchExpensesAndRevenues(1, 300, `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getUTCFullYear()}`, `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getUTCFullYear()}`));
        paginate(page);
    }, []);


    useEffect(() => {
        dispatch(asyncFetchExpensesAndRevenues(1, 300, `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getUTCFullYear()}`, `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getUTCFullYear()}`));
    }, [startDate, endDate]);

    useEffect(() => {
        find();
    }, [findTransaction])

    useEffect(() => {
        setTransactions(financial.expensesRevenue);
    }, [financial])


    const paginate = (page: number) => {
        const pageSize = 5;
        setTransactions([...financial.expensesRevenue].slice((page - 1) * pageSize, page * pageSize));
    }

    const conciliateExpense = () => {
        dispatch(asyncConciliateExpense(expenseId, seasons.selectedSeason.id));
    }

    const deleteExpense = (id: number) => {
        dispatch(asyncDeleteExpense(id));
        dispatch(asyncFetchBankAccountsData);
        dispatch(asyncFetchExpensesAndRevenues);
    }

    const find = () => {
        setTransactions(financial.expensesRevenue?.filter((transaction: ExpensesRevenue) => {
            if (transaction?.reference?.toUpperCase().includes(findTransaction.toUpperCase())) {
                return transaction;
            }
            return null;
        }))
    }

    return <div style={{ marginTop: '2%' }}>
        <Card className="ra-card">
            <Card.Body>
                <Row>
                    <Col md={6}>
                        <h5>Transações</h5>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Control type="text" style={{ backgroundColor: "transparent", borderColor: '#4F9D24', borderRadius: '100px', height: '30px' }} placeholder="Pesquisar" onChange={(e) => {
                                setFindTransaction(e.target.value);
                            }}></Form.Control>
                        </Form>
                    </Col>
                </Row>
                <div className="flex-right" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%', marginBottom: '2%' }}>
                    <h5>{`${startDate.toLocaleDateString('pt-BR')} até ${endDate.toLocaleDateString('pt-BR')}`}</h5>
                    <FontAwesomeIcon icon={faCalendar} onClick={() => setShowModalDates(true)} style={{ cursor: 'pointer' }}></FontAwesomeIcon>
                </div>
                <div style={{ overflowX: 'hidden', overflowY: 'scroll', maxHeight: '300px' }}>
                    <Table striped bordered hover style={{ tableLayout: 'fixed' }}>
                        <thead style={{ backgroundColor: '#243C74', color: '#fff', fontSize: '12px' }}>
                            <tr>
                                <th>Data</th>
                                <th>Fornecedor/Cliente</th>
                                <th>Valor</th>
                                <th>NF</th>
                                <th>Categoria</th>
                                <th>Obs</th>
                                <th>Pago</th>
                                <th>Conciliado</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: '#fff', color: '#000', fontSize: '12px' }}>
                            {transactions.map((er, index) => {
                                return <tr key={index}>
                                    <td>{new Date(er.payment_date!).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                    <td>{er.reference}</td>
                                    <td style={{ color: (er.expenses_invoice_id === null ? 'green' : 'red') }}>{Number(er.amount).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</td>
                                    <td>{er.number}</td>
                                    <td>{er.cost_type}</td>
                                    <td>{er.observations}</td>
                                    <td>
                                        <Form.Check aria-label="Pago" onChange={(e: any) => {
                                            if (e.target.checked) {
                                                setShowModalPayExpense(true);
                                                setExpenseId(er.expenses_invoice_id!);
                                                setContractId(er.contract_id!);
                                            }
                                        }} checked={er.is_paid} />
                                    </td>
                                    <td>
                                        <Form.Check aria-label="Conciliado" checked={er.is_concilliated} onChange={(e: any) => {
                                            if (e.target.checked && er.is_paid) {
                                                setExpenseId(er.expenses_invoice_id!);
                                                conciliateExpense();
                                            } else if (!er.is_paid && e.target.checked) {
                                                e.target.checked = false;
                                                dispatch(getMessages({
                                                    message: "Sua conta precisa estar paga antes de conciliar",
                                                    type: "error",
                                                }))
                                            }
                                        }} />
                                    </td>
                                    <td>
                                        <div className="flex-space-between">
                                            <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} onClick={() => {
                                                console.log(er.id);
                                                setExpenseId(er.expenses_invoice_id!);
                                                deleteExpense(er.expenses_invoice_id!);
                                            }}></FontAwesomeIcon>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
        <PayExpenseModal show={showModalPayExpense} handleClose={() => setShowModalPayExpense(false)} expenseId={expenseId} contractId={contractId}></PayExpenseModal>
        <TransactionDates show={showModalDates} handleClose={() => setShowModalDates(false)} onUpdate={(startDate: any, endDate: any) => {
            setStartDate(startDate);
            setEndDate(endDate);
            setShowModalDates(false);
        }}></TransactionDates>
    </div >
}