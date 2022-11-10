import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./NewProduct.scss";
import DatePicker from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import { useDispatch, useSelector } from "react-redux";
import { asyncAddUserProductToStorage, asyncFetchInvoices, asyncUpdateUserProductOnStorage } from "../../../../stores/input.store";
import { RootState } from "../../../..";
import { Invoice } from "../../../../models/Invoice";
import { Typeahead } from "react-bootstrap-typeahead";
import { UserProduct } from "../../../../models/UserProduct";
import { ProductItem } from "./ProductItem";

let emptyDate: Date;
const emptyProductList: UserProduct[] = [];
export function NewProduct({ modal, handleClose }: { modal: string, handleClose: any }) {
    const { input } = useSelector((state: RootState) => state);
    const [linkInvoice, setLinkInvoice] = useState(false);
    const [showFormLinkInvoice, setShowFormLinkInvoice] = useState(false);
    const [startDate, setStartDate] = useState(emptyDate);
    const [endDate, setEndDate] = useState(emptyDate);
    const dispatch = useDispatch<any>();
    const [invoices, setInvoices] = useState(input.invoices);
    const [selectedInvoice, setSelectedInvoice] = useState(new Invoice());
    const [products, setProducts] = useState([new UserProduct()]);
    const [productsToUpdate, setProductsToUpdate] = useState(emptyProductList);
    const [productsToAdd, setProductsToAdd] = useState(emptyProductList);

    const validateUserProduct = (userProduct: UserProduct, method: string) => {
        let isValid = true;
        switch (method) {
            case 'PUT': {
                if (userProduct.user_product_id === null) {
                    isValid = false;
                }

                if(userProduct.quantity === null) {
                    isValid = false;
                }

                if(userProduct.total_price === null) {
                    isValid = false;
                }

                if(userProduct.measure_unit === null) {
                    isValid = false;
                }
                return isValid;
            }
        }
    }
    const onUpdateItem = (product: UserProduct, index: number, userHasProduct: boolean) => {
        const productsArr = [...products];
        productsArr.splice(index, 1);
        productsArr.push(product);
        setProducts(productsArr);

        if (userHasProduct && validateUserProduct(product, 'PUT')) {
            const toUpdtArr = [...productsToUpdate];
            toUpdtArr.splice(index, 1);
            setProductsToUpdate(toUpdtArr.concat(product))
        } else if(validateUserProduct(product, 'POST')){ 
            const toAddArr = [...productsToAdd];
            toAddArr.splice(index, 1);
            setProductsToAdd(toAddArr.concat(product));
        }
        console.log('add', productsToAdd);
        console.log('update', productsToUpdate);

    }

    const onRemoveItem = (index: number) => {
        const productsArr = [...products];
        productsArr.splice(index, 1);
        setProducts(productsArr);
    }

    const search = () => {
        const invoices = input.invoices.filter((invoice: Invoice) => {
            return new Date(invoice?.due_date!).getTime() >= startDate.getTime() && new Date(invoice?.due_date!).getTime()! <= endDate.getTime();
        });
        setInvoices(invoices);
    }

    const register = () => {
        if (productsToAdd.length > 0) {
            dispatch(asyncAddUserProductToStorage(productsToAdd, selectedInvoice.id!));
        }

        if (productsToUpdate.length > 0) {
            dispatch(asyncUpdateUserProductOnStorage(productsToUpdate, selectedInvoice.id!));
        }
        console.log('bateu no handle close');
        handleClose();

    }

    useEffect(() => {
        dispatch(asyncFetchInvoices());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setInvoices(input.invoices);
    }, [input]);

    useEffect(() => {
        console.log(products);
    }, [products])

    return <div>
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
                            id="invoice"
                            onChange={selected => {
                                const invoiceSelected = selected[0] as Invoice;
                                setSelectedInvoice(invoiceSelected);
                            }}
                            options={invoices.map(invoice => { return { ...invoice, label: invoice.reference }; })}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <hr />
        </div> : <></>}
        {products.map((newUserProduct, index) => {
            return <ProductItem index={index} key={index} onHandleRemove={onRemoveItem} onHandleUpdate={onUpdateItem} modalWithdrawal={modal === "WITHDRAWAL"}></ProductItem>
        })}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
            <Button variant="primary" onClick={() => setProducts([...products, new UserProduct()])}>Adicionar Linha</Button>
            <Button variant="success" onClick={() => register()}>Registrar</Button>
        </div>

    </div>
}