import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import { useDispatch, useSelector } from "react-redux";
import { Part } from "../../../../models/Part";
import { asyncOutputParts } from "../../../../stores/maintenance.store";
import { NewOutputParts } from "../components/NewOutputParts";

let emptyDate: Date;
export function OutputPartsModal({ show, handleClose }: { show: boolean, handleClose: any }) {

    const dispatch = useDispatch<any>();
    const [products, setProducts] = useState([new Part()]);

    const onUpdateItem = (product: Part, index: number) => {
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


    const register = () => {
        dispatch(asyncOutputParts(products))
        
        handleClose();

    }
    return (
        <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'xl'}>
            <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
                <Modal.Title> <span style={{ color: '#fff' }}>Saída de Peça</span></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#7C5529" }}>
                <div>
        {products.map((p, index) => {
            return <NewOutputParts index={index} key={index} onHandleRemove={onRemoveItem} onHandleUpdate={onUpdateItem}></NewOutputParts>
        })}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
            <Button variant="primary" onClick={() => setProducts([...products, new Part()])}>Adicionar Linha</Button>
            <Button variant="success" onClick={() => register()}>Registrar</Button>
        </div>

    </div>
            </Modal.Body>
        </Modal >
    );
}