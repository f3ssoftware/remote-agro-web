import { faCalendar, faEye, faPencil, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { start } from "repl";
import { RootState } from "../../../..";
import { ExpensesRevenue } from "../../../../models/ExpensesRevenue";
import { asyncConciliateExpense, asyncDeleteExpense, asyncFetchBankAccountsData, asyncFetchContractsData, asyncFetchExpensesAndRevenues, asyncPayExpense, setFilterDates } from "../../../../stores/financial.store";
import { getMessages } from "../../../../stores/messaging.store";
import { PayExpenseModal } from "../modals/PayExpenseModal";
import { TransactionDates } from "../modals/TransactionDates";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DeleteConfirmationModal } from "../modals/DeleteConfirmationModal";

const initialTransactions: ExpensesRevenue[] = []
export function Transactions() {
    const { financial, seasons } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();
    const [showModalPayExpense, setShowModalPayExpense] = useState(false);
    const [expenseId, setExpenseId] = useState(0);
    const [deleteExpense, setDeleteExpense] = useState(0)
    const [deleteContract, setDeleteContract] = useState(0)
    const [startDate, setStartDate] = useState(new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1));
    const [endDate, setEndDate] = useState(new Date(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0));
    const [showModalDates, setShowModalDates] = useState(false);
    const [findTransaction, setFindTransaction] = useState('');
    const [transactions, setTransactions] = useState(initialTransactions);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [contractId, setContractId] = useState(0);
    const [amount, setAmount] = useState(0);
    const [expenseRevenueId, setExpenseRevenueId] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        dispatch(asyncFetchExpensesAndRevenues(1, 300, `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getUTCFullYear()}`, `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getUTCFullYear()}`));
        paginate(page);
        dispatch(setFilterDates({
            startDate: startDate.toLocaleDateString('pt-BR'),
            endDate: endDate.toLocaleDateString('pt-BR')
        }));
    }, []);


    useEffect(() => {
        dispatch(asyncFetchExpensesAndRevenues(1, 300, `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getUTCFullYear()}`, `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getUTCFullYear()}`));
        dispatch(setFilterDates({
            startDate: startDate.toLocaleDateString('pt-BR'),
            endDate: endDate.toLocaleDateString('pt-BR')
        }));
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
                        <FontAwesomeIcon icon={faPrint} style={{ cursor: 'pointer', marginLeft: '1%' }} onClick={() => {
                            const doc = new jsPDF()

                            const info: any = []
                            transactions.forEach((er) => {
                                info.push([new Date(er.payment_date!).toLocaleDateString('pt-BR', { timeZone: 'UTC' }), er.reference, Number(er.amount).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true }), er.number, er.cost_type, er.observations, er.is_paid ? 'Sim' : 'Não', er.is_concilliated ? 'Sim' : 'Não'])
                            })

                            autoTable(doc, {
                                head: [['Data', 'Fornecedor/Cliente', 'Valor', 'NF', 'Categoria', 'Obs', 'Pago', 'Conciliado']],
                                body: info
                            })

                            switch(financial.activeCard) {
                                case 'total': {
                                    doc.save(`TOTAL_${financial.filterDates.startDate}-${financial.filterDates.endDate}.pdf`);
                                } break;
                                case 'billings': {
                                    doc.save(`CONTAS_RECEBER_${financial.filterDates.startDate}-${financial.filterDates.endDate}.pdf`);
                                } break;
                                case 'payments': {
                                    doc.save(`CONTAS_PAGAR_${financial.filterDates.startDate}-${financial.filterDates.endDate}.pdf`);
                                } break;
                                case 'due_dated': {
                                    doc.save(`VENCIDAS_${financial.filterDates.startDate}-${financial.filterDates.endDate}.pdf`);
                                } break;
                                case 'paid': {
                                    doc.save(`PAGAS_${financial.filterDates.startDate}-${financial.filterDates.endDate}.pdf`);
                                } break;
                                case 'received': {
                                    doc.save(`RECEBIDAS_${financial.filterDates.startDate}-${financial.filterDates.endDate}.pdf`);
                                } break;
                            }
                            

                        }}></FontAwesomeIcon>
                    </Col>
                    <Col style={{ marginBottom: '1%' }} md={5}>
                        <Form>
                            <Form.Control type="text" style={{ backgroundColor: "transparent", borderColor: '#4F9D24', borderRadius: '100px', height: '30px' }} placeholder="Pesquisar" onChange={(e) => {
                                setFindTransaction(e.target.value);
                            }}></Form.Control>
                        </Form>
                    </Col>
                </Row>
                {/* <div className="flex-right" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%', marginBottom: '2%' }}>
                    <h5>{`${startDate.toLocaleDateString('pt-BR')} até ${endDate.toLocaleDateString('pt-BR')}`}</h5>
                    <FontAwesomeIcon icon={faCalendar} onClick={() => setShowModalDates(true)} style={{ cursor: 'pointer' }}></FontAwesomeIcon>
                </div> */}
                <div style={{ overflowX: 'hidden', overflowY: 'scroll', maxHeight: '670px' }}>
                    <Table striped bordered hover style={{ tableLayout: 'fixed' }}>
                        <colgroup>
                            <col style={{ width: '7%' }}></col>
                            <col style={{ width: '10%' }}></col>
                            <col style={{ width: '15%' }}></col>
                            <col style={{ width: '8%' }}></col>
                            <col style={{ width: '20%' }}></col>
                            <col style={{ width: '25%' }}></col>
                            <col style={{ width: '5%' }}></col>
                            <col style={{ width: '5%' }}></col>
                            <col style={{ width: '5%' }}></col>
                        </colgroup>
                        <thead style={{ backgroundColor: '#243C74', color: '#fff', fontSize: '12px' }}>
                            <tr>
                                <th><small>Data</small></th>
                                <th><small>Fornecedor/Cliente</small></th>
                                <th><small>Valor</small></th>
                                <th><small>NF</small></th>
                                <th><small>Categoria</small></th>
                                <th><small>Obs</small></th>
                                <th><small>Pago</small></th>
                                <th><small>Conciliado</small></th>
                                <th><small>Ações</small></th>
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
                                                setAmount(Number(er.amount)!);
                                                setExpenseRevenueId(er.id!);
                                            }
                                        }} checked={!!er.is_paid} />
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
                                                setShowDeleteModal(true)
                                                setExpenseId(er.expenses_invoice_id!);
                                                setDeleteExpense(er.expenses_invoice_id!);
                                                setDeleteContract(er.contract_id!)
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
        <PayExpenseModal show={showModalPayExpense} handleClose={() => setShowModalPayExpense(false)} expenseId={expenseId} contractId={contractId} amount={amount} expensesRevenuesId={expenseRevenueId}></PayExpenseModal>
        <TransactionDates show={showModalDates} handleClose={() => setShowModalDates(false)} onUpdate={(startDate: any, endDate: any) => {
            setStartDate(startDate);
            setEndDate(endDate);
            setShowModalDates(false);
        }}></TransactionDates>
        <DeleteConfirmationModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} id={deleteExpense} id2={deleteContract}></DeleteConfirmationModal>
    </div >
}