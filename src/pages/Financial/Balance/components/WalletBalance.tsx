import { useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../..";
import { asyncFetchExpensesAndRevenues, asyncFetchExpensesInvoicesData, asyncFilterByButton, filterByButton } from "../../../../stores/financial.store";
import "../Balance.scss";

export function WalletBalance() {
    const financial = useSelector((state: RootState) => state.financial);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(asyncFetchExpensesInvoicesData());
    }, [])
    return <Card className="ra-card">
        <Card.Body>
            <h4>Carteira</h4>
            {/* <Card.Title>Carteira</Card.Title> */}
            <Row>
                <Col md={4}>
                    <Card className="ra-card-billing" onClick={() => {
                        dispatch(asyncFilterByButton('billings'))
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
                        dispatch(asyncFilterByButton('payments'))
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
                        dispatch(asyncFilterByButton('due_dated'))
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
    </Card>
}