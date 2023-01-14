import { forwardRef, useEffect, useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../..";
import { asyncFetchExpensesAndRevenues, asyncFetchExpensesInvoicesData, asyncFilterByButton, setCardActive, setFilterDates } from "../../../../stores/financial.store";
import "../Balance.scss";
import { TransactionDates } from "../modals/TransactionDates";
import { faArrowRightLong, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pt } from "date-fns/locale";
import DatePicker from "react-datepicker";
import { TotalBalance } from "./TotalBalance";
import { BankAccountsModal } from "../modals/BankAccountsModal";

export function WalletBalance() {
    const [showModalDates, setShowModalDates] = useState(false);
    const financial = useSelector((state: RootState) => state.financial);
    const [startDate, setStartDate] = useState(new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1));
    const [endDate, setEndDate] = useState(new Date(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0));
    const [showModalBankAccounts, setShowModalBankAccounts] = useState(false);
    const dispatch = useDispatch<any>();
    const [activeCard, setActiveCard] = useState('total');

    const ExampleCustomInput = forwardRef<any, any>(({ value, onClick }, ref) => (
        <button style={{ backgroundColor: '#7c542b', border: 'none', borderRadius: 10, fontWeight: 'bold', fontSize: '20px', color: '#FFF' }} onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const fetchExpensesInvoicesData = () => {
        // const startDate = financial.filterDates.startDate;
        // const endDate = financial.filterDates.endDate;
        dispatch(asyncFetchExpensesInvoicesData(startDate.toLocaleDateString('pt-BR'), endDate.toLocaleDateString('pt-BR')));
    }
    useEffect(() => {
        fetchExpensesInvoicesData();
    }, []);

    useEffect(() => {
        dispatch(asyncFetchExpensesAndRevenues(1, 300, `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getUTCFullYear()}`, `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getUTCFullYear()}`));
        dispatch(setFilterDates({
            startDate: startDate.toLocaleDateString('pt-BR'),
            endDate: endDate.toLocaleDateString('pt-BR')
        }));
        fetchExpensesInvoicesData();
    }, [startDate, endDate]);
    return <Card className="ra-card">
        <Card.Body>
            <Row>
                <Col md={4}>
                    <h4>Carteira</h4>
                </Col>
                <Col md={2}>
                    <Form.Group className="mb-3" controlId="">
                        {/* <Form.Label>De</Form.Label> */}
                        <DatePicker selected={startDate} onChange={(date: any) => {
                            setStartDate(date);
                        }} locale={pt} dateFormat="dd/MM/yyyy" customInput={<ExampleCustomInput></ExampleCustomInput>} />
                    </Form.Group>
                </Col>
                <Col md={1}>
                    <FontAwesomeIcon icon={faArrowRightLong} style={{ color: '#4F9D24' }}></FontAwesomeIcon>
                </Col>
                <Col md={2}>
                    <Form.Group className="mb-3" controlId="">
                        <DatePicker selected={endDate} onChange={(date: any) => {
                            setEndDate(date);
                        }} locale={pt} dateFormat="dd/MM/yyyy" customInput={<ExampleCustomInput></ExampleCustomInput>} />
                    </Form.Group>
                </Col>
                <Col>
                    <a style={{ color: '#000AFF', fontWeight: 'bold', cursor: 'pointer' }} onClick={(e) => setShowModalBankAccounts(true)}>Ver contas bancárias</a>
                </Col>
            </Row>

            <Row>
                <Col md={2}>
                    <Card className={activeCard === 'total' ? 'ra-card-total-balance' : 'ra-card-inactive'} onClick={() => {
                        dispatch(setCardActive('total'));
                        setActiveCard('total');
                        dispatch(asyncFilterByButton('total', financial.filterDates.startDate, financial.filterDates.endDate));
                    }}>
                        <Card.Body>
                            <h6>Total</h6>
                            <Row>
                                <Col>
                                    <h6>{`${Number(((financial?.expensesInvoiceData?.unpaidContractsData! + financial.expensesInvoiceData.paidContractsData!) - (financial.expensesInvoiceData.unpaidExpensesInvoicesData! + financial.expensesInvoiceData.expiredContractsData! + financial.expensesInvoiceData.paidExpensesInvoicesData!))).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}`}</h6>
                                    {/* <h4>{`${financial?.expensesInvoiceData?.unpaidContractsData?.toLocaleString('fullwide', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}`}</h4> */}
                                    {/* <TotalBalance></TotalBalance> */}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card className={activeCard === 'billings' || activeCard === 'total' ? 'ra-card-billing' : 'ra-card-inactive'} onClick={() => {
                        dispatch(setCardActive('billings'));
                        setActiveCard('billings');
                        dispatch(asyncFilterByButton('billings', financial.filterDates.startDate, financial.filterDates.endDate));
                    }}>
                        <Card.Body>
                            <h6>Contas a Receber ({financial?.expensesInvoiceData?.unpaidContractsQuantity})</h6>
                            <Row>
                                <Col>
                                    <h6>{`${financial?.expensesInvoiceData?.unpaidContractsData?.toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}`}</h6>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card className={activeCard === 'payments' || activeCard === 'total' ? 'ra-card-payments' : 'ra-card-inactive'} onClick={() => {
                        dispatch(setCardActive('payments'));
                        setActiveCard('payments');
                        dispatch(asyncFilterByButton('payments', financial.filterDates.startDate, financial.filterDates.endDate));
                    }}>
                        <Card.Body>
                            <h6>Contas a Pagar ({financial?.expensesInvoiceData?.unpaidExpensesInvoicesQuantity})</h6>
                            <Row>
                                <Col>
                                    <h6>{financial?.expensesInvoiceData?.unpaidExpensesInvoicesData?.toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</h6>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card className={activeCard === 'due_dated' || activeCard === 'total' ? 'ra-card-duedated' : 'ra-card-inactive'} onClick={async () => {
                        dispatch(setCardActive('due_dated'));
                        setActiveCard('due_dated');
                        dispatch(asyncFilterByButton('due_dated', financial.filterDates.startDate, financial.filterDates.endDate));
                    }}>
                        <Card.Body>
                            <h6>Contas Vencidas ({financial?.expensesInvoiceData?.expiredExpensesInvoicesQuantity! + financial.expensesInvoiceData.expiredContractsQuantity!})</h6>
                            <Row>
                                <Col>
                                    <h6>{financial?.expensesInvoiceData?.expiredExpensesInvoicesData?.toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</h6>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card className={activeCard === 'paid' || activeCard === 'total' ? 'ra-card-paid' : 'ra-card-inactive'} onClick={async () => {
                        dispatch(setCardActive('paid'));
                        setActiveCard('paid');
                        dispatch(asyncFilterByButton('paid', financial.filterDates.startDate, financial.filterDates.endDate));
                    }}>
                        <Card.Body>
                            <h6>Pagos ({financial?.expensesInvoiceData?.paidExpensesInvoicesQuantity!})</h6>
                            <Row>
                                <Col>
                                    <h6>{financial?.expensesInvoiceData?.paidExpensesInvoicesData?.toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</h6>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card className={activeCard === 'received' || activeCard === 'total' ? 'ra-card-received' : 'ra-card-inactive'} onClick={async () => {
                        dispatch(setCardActive('received'));
                        setActiveCard('received');
                        dispatch(asyncFilterByButton('received', financial.filterDates.startDate, financial.filterDates.endDate));
                    }}>
                        <Card.Body>
                            <h6>Recebidas ({financial.expensesInvoiceData.paidContractsQuantity})</h6>
                            <Row>
                                <Col>
                                    <h6>{financial?.expensesInvoiceData?.paidContractsData?.toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</h6>
                                    {/* <h4>R$ ?</h4> */}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Card.Body>
        <BankAccountsModal show={showModalBankAccounts} handleClose={() => setShowModalBankAccounts(false)}></BankAccountsModal>
    </Card>
}