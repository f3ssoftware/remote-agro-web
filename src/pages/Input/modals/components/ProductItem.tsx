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
    const [userProductId, setUserProductId] = useState(0);
    const [measureUnit, setMeasureUnit] = useState('');
    const [minimumQuantity, setMinimumQuantity] = useState(0);
    const [initialQuantity, setInitialQuantity] = useState(0);
    const [initialCost, setInitialCost] = useState(0);
    const [observation, setObservation] = useState("");
    const [accountable, setAccountable] = useState('');
    const [userHasProduct, setUserHasProduct] = useState(false);

    useEffect(() => {
        const p: UserProduct = {
            measure_unit: measureUnit,
            // user_product_id: userProductId,
            // minimum_quantity: minimumQuantity,
            accountable: accountable,
            observations: observation,
            quantity: initialQuantity * 1000,
            total_price: initialCost * 100,
            treatment: (modalWithdrawal ? 'RETIRADA' : null)
        };
        if (userHasProduct) {
            p.user_product_id = userProductId;
        } else {
            p.product_id = productId;
        }
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
                            console.log(p);
                            const userProducts = input.inputs.filter(i => i.product?.name === p.label)
                            if (userProducts.length > 0) {
                                setUserHasProduct(true);
                                setUserProductId(userProducts[0].id!);
                                setMeasureUnit(userProducts[0].measure_unit!);
                            } else {
                                setUserHasProduct(false);
                                setProductId(p.id);
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
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Responsável</Form.Label>
                <Form.Control type="text" onChange={(e) => {
                    setAccountable(e.target.value);
                }} />
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
                }} />
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