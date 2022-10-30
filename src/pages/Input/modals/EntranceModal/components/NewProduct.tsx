import { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import "./NewProduct.scss";
import DatePicker from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchInvoices } from "../../../../../stores/input.store";
import { RootState } from "../../../../..";
import { Invoice } from "../../../../../models/Invoice";
import { Typeahead } from "react-bootstrap-typeahead";
import { Product } from "../../../../../models/Product";
import { UserProduct } from "../../../../../models/UserProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CurrencyInput from "react-currency-input-field";

let emptyDate: Date;
export function NewProduct() {
    const { input } = useSelector((state: RootState) => state);
    const [linkInvoice, setLinkInvoice] = useState(false);
    const [showFormLinkInvoice, setShowFormLinkInvoice] = useState(false);
    const [startDate, setStartDate] = useState(emptyDate);
    const [endDate, setEndDate] = useState(emptyDate);
    const dispatch = useDispatch<any>();
    const [invoices, setInvoices] = useState(input.invoices);
    const [selectedInvoice, setSelectedInvoice] = useState(new Invoice());
    const [products, setProducts] = useState([new UserProduct()])

    const search = () => {
        const invoices = input.invoices.filter((invoice: Invoice) => {
            return new Date(invoice?.due_date!).getTime() >= startDate.getTime() && new Date(invoice?.due_date!).getTime()! <= endDate.getTime();
        });
        console.log(invoices);
        setInvoices(invoices);
    }

    const register = () => {
        console.log(products);
    }

    useEffect(() => {
        dispatch(asyncFetchInvoices());
    }, []);

    useEffect(() => {
        setInvoices(input.invoices);
    }, [input]);

    return <div>
        <h4 style={{ color: '#fff' }}>Novo Produto</h4>
        <Form.Check
            style={{ color: '#fff', marginBottom: '2%' }}
            type="switch"
            checked={linkInvoice}
            onChange={() => {
                setLinkInvoice(!linkInvoice);
                setShowFormLinkInvoice(!linkInvoice);
                dispatch(asyncFetchInvoices());
            }}
            id={`default-checkbox`}
            label={`Vincular Nota`}
        />
        {showFormLinkInvoice ? <div>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>De</Form.Label>
                        <DatePicker selected={startDate} onChange={(date: any) => {
                            console.log('changing');
                            setStartDate(date);
                            search();
                        }} locale={pt} dateFormat="dd/MM/yyyy" />
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Até</Form.Label>
                        <DatePicker selected={endDate} onChange={(date: any) => {
                            setEndDate(date);
                            search();
                        }} locale={pt} dateFormat="dd/MM/yyyy" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Vinculação de Nota</Form.Label>
                        <Typeahead
                            onChange={selected => {
                                console.log(selected);
                            }}
                            options={invoices.map(invoice => { return { ...invoice, label: invoice.reference }; })}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <hr />
        </div> : <></>}
        {products.map((newUserProduct, index) => {
            return <Row style={{ marginTop: '2%' }}>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Produto</Form.Label>
                        <Typeahead
                            onChange={(selected) => {
                                const a = selected[0] as Product;
                                const productUpdated: UserProduct = {
                                    product_id: a.id
                                }
                                let newProducts = products.splice(index, 1);
                                newProducts.push(productUpdated);
                                setProducts(newProducts);
                                console.log(products);
                            }}
                            options={input.inputs.map(input => { return { id: input.id, label: input.product?.name } })}
                        />
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Unidade Medida</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Estoque Mínimo</Form.Label>
                        <Form.Control type="number" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Quantidade Inicial</Form.Label>
                        <Form.Control type="number" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Custo Inicial</Form.Label>
                        <Form.Control type="text" onBlur={(e) => {
                            e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('fullwide', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })

                        }} />
                        {/* <CurrencyInput></CurrencyInput> */}
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Observações</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </Col>
                {index !== 0 ? <Col md={1}>
                    <Button variant="danger" onClick={() => {
                        let productsArray = [...products];
                        productsArray.splice(index, 1);
                        setProducts(productsArray);
                    }} style={{ marginTop: '45%' }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                </Col> : <></>}
            </Row>
        })}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
            <Button variant="primary" onClick={() => setProducts([...products, new UserProduct()])}>Adicionar Linha</Button>
            <Button variant="success" onClick={() => register()}>Registrar Produto</Button>
        </div>

    </div>
}