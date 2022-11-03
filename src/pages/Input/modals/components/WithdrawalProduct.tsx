import { pt } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import { Invoice } from "../../../../models/Invoice";
import { UserProduct } from "../../../../models/UserProduct";
import { asyncAddUserProductToStorage, asyncFetchInvoices } from "../../../../stores/input.store";
import { ProductItem } from "./ProductItem";
import DatePicker from "react-datepicker";
import { Product } from "../../../../models/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

let emptyDate: Date;
export function WithdrawalProduct({ index, onHandleRemove, onHandleUpdate }: { index: number, onHandleRemove: any, onHandleUpdate: any }) {
    const { input } = useSelector((state: RootState) => state);
    const [productId, setProductId] = useState(0);
    const [measureUnit, setMeasureUnit] = useState('');
    const [minimumQuantity, setMinimumQuantity] = useState(0);
    const [initialQuantity, setInitialQuantity] = useState(0);
    const [initialCost, setInitialCost] = useState(0);
    const [observation, setObservation] = useState("");
    const [accountable, setAccountable] = useState("");

    useEffect(() => {
        const p: UserProduct = {
            measure_unit: measureUnit,
            product_id: productId,
            minimum_quantity: minimumQuantity,
            observations: observation,
            quantity: initialQuantity,
            total_price: initialCost,
            treatment: null,
            accountable: accountable
        };
        onHandleUpdate(p, index);
    }, [productId, measureUnit, minimumQuantity, initialQuantity, initialCost, observation]);
    return <Row style={{ marginTop: '2%' }}>
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Produto</Form.Label>
                <Typeahead
                    onChange={(selected) => {
                        if (selected.length > 0) {
                            const p = selected[0] as Product;
                            setProductId(p.id!);
                        }
                    }}
                    options={input.generalProductsList.map(input => { return { id: input.id, label: input?.name } })}
                />
            </Form.Group>

        </Col>
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Quantidade</Form.Label>
                <Form.Control type="number" onChange={(e) => {
                    setInitialQuantity(Number(e.target.value));
                }} />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Observações</Form.Label>
                <Form.Control type="text" onChange={(e) => setObservation(e.target.value)} />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Responsável</Form.Label>
                <Form.Control type="text" onChange={(e) => setAccountable(e.target.value)} />
            </Form.Group>
        </Col>
        {index !== 0 ? <Col md={1}>
            <Button variant="danger" onClick={() => {
                onHandleRemove(index);
            }} style={{ marginTop: '45%' }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
        </Col> : <></>}
    </Row>
}