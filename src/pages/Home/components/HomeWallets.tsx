import { forwardRef, useEffect, useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { faArrowRightLong, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pt } from "date-fns/locale";
import DatePicker from "react-datepicker";
import { TotalBalance } from "../../Financial/Balance/components/TotalBalance";
import { RootState } from "../../..";
import { asyncFetchExpensesInvoicesData, asyncFetchExpensesAndRevenues, setFilterDates, asyncFilterByButton } from "../../../stores/financial.store";

export function HomeWallets() {
    const [showModalDates, setShowModalDates] = useState(false);
    const financial = useSelector((state: RootState) => state.financial);
    const [startDate, setStartDate] = useState(new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1));
    const [endDate, setEndDate] = useState(new Date(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0));
    const [showModalBankAccounts, setShowModalBankAccounts] = useState(false);
    const dispatch = useDispatch<any>();

    const ExampleCustomInput = forwardRef<any, any>(({ value, onClick }, ref) => (
        <button style={{ backgroundColor: '#7c542b', border: 'none', borderRadius: 10, fontWeight: 'bold', fontSize: '20px' }} onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    useEffect(() => {
        const startDate = financial.filterDates.startDate;
        const endDate = financial.filterDates.endDate;
        dispatch(asyncFetchExpensesInvoicesData(startDate, endDate));
    }, []);

    useEffect(() => {
        dispatch(asyncFetchExpensesAndRevenues(1, 300, `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getUTCFullYear()}`, `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getUTCFullYear()}`));
        dispatch(setFilterDates({
            startDate: startDate.toLocaleDateString('pt-BR'),
            endDate: endDate.toLocaleDateString('pt-BR')
        }));
    }, [startDate, endDate]);
    return <Card className="ra-card">
        <Card.Body>
            <Row>
                <Col md={4}>
                    <h4>Carteira</h4>
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <Card className="ra-card-billing" onClick={() => {
                        dispatch(asyncFilterByButton('billings', financial.filterDates.startDate, financial.filterDates.endDate));
                    }}>
                        <Card.Body>
                            <h6>Contas a Receber ({financial?.expensesInvoiceData?.unpaidContractsQuantity})</h6>
                            <Row>
                                <Col>
                                    <h4>{`${financial?.expensesInvoiceData?.unpaidContractsData?.toLocaleString('fullwide', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}`}</h4>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="ra-card-payments" onClick={() => {
                        dispatch(asyncFilterByButton('payments', financial.filterDates.startDate, financial.filterDates.endDate));
                    }}>
                        <Card.Body>
                            <h6>Contas a Pagar ({financial?.expensesInvoiceData?.unpaidExpensesInvoicesQuantity})</h6>
                            <Row>
                                <Col>
                                    <h4>{financial?.expensesInvoiceData?.unpaidExpensesInvoicesData?.toLocaleString('fullwide', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</h4>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="ra-card-duedated" onClick={async () => {
                        dispatch(asyncFilterByButton('due_dated', financial.filterDates.startDate, financial.filterDates.endDate));
                    }}>
                        <Card.Body>
                            <h6>Contas Vencidas ({financial?.expensesInvoiceData?.expiredExpensesInvoicesQuantity! + financial.expensesInvoiceData.expiredContractsQuantity!})</h6>
                            <Row>
                                <Col>
                                    <h4>{financial?.expensesInvoiceData?.expiredExpensesInvoicesData?.toLocaleString('fullwide', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</h4>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Card.Body>
        {/* <TransactionDates show={showModalDates} handleClose={() => setShowModalDates(false)} onUpdate={(startDate: any, endDate: any) => {
            setStartDate(startDate);
            setEndDate(endDate);
            setShowModalDates(false);
        }}></TransactionDates> */}
    </Card>
}