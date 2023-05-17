import { Modal, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IncomeContracts } from "../../ManualRegistration/components/IncomeContracts";
import { Contract } from "../../../../models/Contract";
import { ExpenseInvoice } from "../../../../models/ExpenseInvoice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import DatePicker from "react-datepicker";
import { pt } from "date-fns/locale";
import { Installments } from "../../ManualRegistration/components/Installments";
import { MensalExpense } from "../../ManualRegistration/components/MensalExpense";
import { asyncFetchExpenseInvoiceById, asyncEditExpenseInvoiceById } from "../../../../stores/financial.store";

export function EditExpenseModal({ show, handleClose, expenseInvoiceId }: { show: boolean, handleClose: any, expenseInvoiceId?: number }) {
    const navigate = useNavigate();
    const [outcomeYear, setOutcomeYear] = useState('');
    const [reference, setReference] = useState('')
    const [amount, setAmount] = useState('')
    const [observation, setObservation] = useState('')
    const [number, setNumber] = useState(0)
    const [plan, setPlan] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState('one_time')
    const [expirationDate, setExpirationDate] = useState(new Date())
    const dispatch = useDispatch<any>();
    const { financial, seasons, loading } = useSelector((state: RootState) => state);
    const [installmentsQuantity, setInstallmentsQuantity] = useState(0);
    const [installments, setInstallments]: any = useState({});
    const [externalInvoiceId, setExternalInvoiceId] = useState(0);
    const [recurrencyDate, setRecurrencyDate] = useState(new Date());
    const [recurrencyQuantity, setRecurrencyQuantity] = useState(1);


    const updateInstallments = (installmentsFromChildren: any[]) => {
        setInstallments(installmentsFromChildren);
    }

    const renderPaymentConditionForm = () => {
        switch (paymentMethod) {
            case 'none':
            case 'one_time': {
                return <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label >Data de pagamento</Form.Label>
                        <DatePicker
                            locale={pt}
                            dateFormat="dd/MM/yyyy"
                            selected={expirationDate}
                            onChange={(date: Date) => setExpirationDate(date)}
                        />
                    </Form.Group>
                </Col>
            }
            case 'installments': {
                return <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label >Quantidade de Parcelas</Form.Label>
                        <Form.Control
                            type="number"
                            min={2}
                            onBlur={(e) => {
                                setInstallmentsQuantity(Number(e.target.value));
                            }}
                        />
                    </Form.Group>
                    <Installments installmentsQuantity={installmentsQuantity} onUpdateInstallments={updateInstallments} totalAmount={Number(amount)}></Installments>
                </Col>
            }
            case 'recurrency': {
                return <Col>
                    <MensalExpense onHandleUpdate={(paymentDate: Date, recurrencyQuantity: number) => {
                        setRecurrencyDate(paymentDate);
                        setRecurrencyQuantity(recurrencyQuantity);
                    }}></MensalExpense>
                </Col>
            }
        }
    }

    const update = async () => {
        const exp: ExpenseInvoice = {
            amount: Number(amount),
            number: number.toString(),
            reference,
            cost_type: financial.expenseInvoiceEdit?.cost_type,
            due_date: expirationDate.toISOString(),
            cost_action: financial.expenseInvoiceEdit?.cost_action,
            payment_method: paymentMethod,
            year: outcomeYear.toString(),
            external_expenses_invoice_id: externalInvoiceId,
            observations: observation,
        }
        dispatch(asyncEditExpenseInvoiceById(expenseInvoiceId!,exp))

    }

    useEffect(() => {
        if(expenseInvoiceId) {
            dispatch(asyncFetchExpenseInvoiceById(expenseInvoiceId!))
        }
        console.log(expenseInvoiceId)
    }, [expenseInvoiceId]);

    useEffect(() => {
        const expenseInvoice = financial.expenseInvoiceEdit;
        console.log('expense invoice: ', expenseInvoice);
        setOutcomeYear(expenseInvoice?.year!);
        setAmount(expenseInvoice?.amount?.toString()!);
        setNumber(Number(expenseInvoice?.number!));
        // setExpirationDate(new Date(expenseInvoice?.due_date!));
        setExternalInvoiceId(expenseInvoice.external_expenses_invoice_id!)
        setReference(expenseInvoice.reference!);
    }, [financial])

    return <Modal backdrop={'static'} show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            {loading.requests.length > 0 ? <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner> : <div>
                <Row style={{ marginTop: '2%' }}>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Ano agrícola</Form.Label>
                            <Form.Select
                                value={outcomeYear}
                                aria-label=""
                                onChange={(e) => {
                                    return setOutcomeYear(e.target.value)
                                }}
                            > {seasons.seasons.map((season, index) => {
                                return <option value={season.year} key={index}>{season.year}</option>
                            })}

                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Referência</Form.Label>
                            <Form.Control
                                type="text"
                                value={reference}
                                onChange={(e) => {
                                    return setReference(e.target.value)
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.currentTarget.value)
                                }}
                                type="text" onBlur={(e) => {
                                    if (isNaN(Number(e.currentTarget.value))) {
                                        e.currentTarget.value = '';
                                    } else {
                                        setAmount(e.currentTarget.value);
                                        e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                                    }

                                }} onKeyUp={(e) => {
                                    if (e.key === 'Backspace') {
                                        e.currentTarget.value = '';
                                    }
                                }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label >Observações</Form.Label>
                            <Form.Control
                                type="text"
                                value={observation}
                                onChange={(e) => {
                                    console.log('observation', e.target.value);
                                    setObservation(e.target.value)
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label >Número</Form.Label>
                            <Form.Control
                                type="number"
                                value={number}
                                onChange={(e) => {
                                    return setNumber(Number(e.target.value))
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label >
                                Vincular Planejamento
                            </Form.Label>
                            <Form.Select
                                aria-label=""
                                onChange={(e) => {
                                    return setPlan(Number(e.target.value))
                                }}
                            >
                                <option>Não Vincular</option>
                                {financial.plannings.map(p => {
                                    return <option value={p.id}>{p.name}</option>;
                                })}

                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                {/* <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label >
                                Método de pagamento
                            </Form.Label>
                            <Form.Select
                                aria-label=""
                                onChange={(e) => {
                                    return setPaymentMethod(e.target.value);
                                }}
                            >
                                <option value={"one_time"}>Á vista</option>
                                <option value={"installments"}>A prazo</option>
                                <option value={"recurrency"}>Gasto mensal</option>
                                <option value={"none"}>Sem necessidade de pagamento</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    {renderPaymentConditionForm()}
                </Row> */}
                <div className="flex-right">
                    <Button variant="success" onClick={() => {
                        update();
                    }}>Atualizar</Button>
                </div>
            </div>}

        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#7C5529", border: 'none' }}>

        </Modal.Footer>
    </Modal>
}