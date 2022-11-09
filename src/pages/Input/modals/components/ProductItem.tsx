import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useSelector } from "react-redux";
import { RootState } from "../../../..";
import { Product } from "../../../../models/Product";
import { ProductListItem } from "../../../../models/ProductListItem";
import { UserProduct } from "../../../../models/UserProduct";
import { unformatCurrency } from "../../../../utils/currencyFormat";

export function ProductItem({ index, onHandleRemove, onHandleUpdate, modalWithdrawal }: { index: number, onHandleRemove: any, onHandleUpdate: any, modalWithdrawal: boolean }) {
    const { input } = useSelector((state: RootState) => state);
    const [productId, setProductId] = useState(0);
    const [measureUnit, setMeasureUnit] = useState('');
    const [minimumQuantity, setMinimumQuantity] = useState(0);
    const [initialQuantity, setInitialQuantity] = useState(0);
    const [initialCost, setInitialCost] = useState(0);
    const [observation, setObservation] = useState("");
    const [userHasProduct, setUserHasProduct] = useState(false);

    useEffect(() => {
        const p: UserProduct = {
            measure_unit: measureUnit,
            product_id: productId,
            // minimum_quantity: minimumQuantity,
            observations: observation,
            quantity: initialQuantity,
            total_price: initialCost,
            treatment: (modalWithdrawal ? 'RETIRADA' : null)
        };
        onHandleUpdate(p, index, userHasProduct);
    }, [productId, measureUnit, minimumQuantity, initialQuantity, initialCost, observation]);
    return <Row style={{ marginTop: '2%' }}>
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Produto</Form.Label>
                <Typeahead
                id="product"
                    onChange={(selected: any) => {
                        if (selected.length > 0) {
                            const p = selected[0];
                            setProductId(p.id!);
                            console.log(p);
                            if (input.inputs.filter(i => i.product?.name === p.label).length > 0) {
                                setUserHasProduct(true);
                            } else {
                                setUserHasProduct(false);
                            }
                        } else {
                            setUserHasProduct(false);
                            onHandleRemove(index);
                        }
                    }}
                    options={input.generalProductsList.map((input) => { return { id: input.id, label: input?.name } })}
                />
            </Form.Group>

        </Col>
        {!userHasProduct ? <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Unidade Medida</Form.Label>
                <Form.Control type="text" onChange={(e) => {
                    setMeasureUnit(e.target.value);
                }} />
            </Form.Group>
        </Col> : <></>}
        {/* {!userHasProduct ? <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Estoque Mínimo</Form.Label>
                <Form.Control type="number" onChange={(e) => {
                    setMinimumQuantity(Number(e.target.value));
                }} />
            </Form.Group>
        </Col> : <></>} */}
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
                <Form.Label style={{ color: '#fff' }}>Custo</Form.Label>
                <Form.Control type="text" onBlur={(e) => {
                    if (isNaN(Number(e.currentTarget.value))) {
                        e.currentTarget.value = '';
                        // const numeric = unformatCurrency(e.currentTarget.value);
                        // setInitialCost(unformatCurrency(e.currentTarget.value));
                        // e.currentTarget.value = numeric.toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true });
                    } else {
                        setInitialCost(Number(e.currentTarget.value));
                        e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                    }

                }} onKeyUp={(e) => {
                    if (e.key === 'Backspace') {
                        e.currentTarget.value = '';
                    }
                }}/>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Observações</Form.Label>
                <Form.Control type="text" onChange={(e) => setObservation(e.target.value)} />
            </Form.Group>
        </Col>
        {index !== 0 ? <Col md={1}>
            <Button variant="danger" onClick={() => {
                onHandleRemove(index);
            }} style={{ marginTop: '45%' }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
        </Col> : <></>}
    </Row>
}