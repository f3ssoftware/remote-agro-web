import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import { Invoice } from "../../../../models/Invoice";
import { UserProduct } from "../../../../models/UserProduct";
import { asyncAddUserProductToStorage, asyncWithdrawUserProductToStorage } from "../../../../stores/input.store";
import { NewProduct } from "../components/NewProduct";
import { WithdrawalProduct } from "../components/WithdrawalProduct";

let emptyDate: Date;
export function WithdrawalModal({ show, handleClose }: { show: boolean, handleClose: any }) {
    const { input } = useSelector((state: RootState) => state);
    const [linkInvoice, setLinkInvoice] = useState(false);
    const [showFormLinkInvoice, setShowFormLinkInvoice] = useState(false);
    const [startDate, setStartDate] = useState(emptyDate);
    const [endDate, setEndDate] = useState(emptyDate);
    const dispatch = useDispatch<any>();
    const [invoices, setInvoices] = useState(input.invoices);
    const [selectedInvoice, setSelectedInvoice] = useState(new Invoice());
    const [products, setProducts] = useState([new UserProduct()])

    const onUpdateItem = (product: UserProduct, index: number) => {
        console.log('batendo aqui');
        const productsArr = [...products];
        productsArr.splice(index, 1);
        productsArr.push(product);
        setProducts(productsArr);
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
        dispatch(asyncWithdrawUserProductToStorage(products, selectedInvoice.id!));
        handleClose();
    }

    return <Modal show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Retirada de estoque</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            {products.map((p, index) => {
                return <WithdrawalProduct index={index} onHandleRemove={onRemoveItem} onHandleUpdate={onUpdateItem}></WithdrawalProduct>
            })}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
                <Button variant="primary" onClick={() => setProducts([...products, new UserProduct()])}>Adicionar Linha</Button>
                <Button variant="success" onClick={() => register()}>Registrar</Button>
            </div>
        </Modal.Body>
    </Modal >
}