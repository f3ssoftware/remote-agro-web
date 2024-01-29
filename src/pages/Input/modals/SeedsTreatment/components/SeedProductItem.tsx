import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../..";
import { Product } from "../../../../../models/Product";
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { asyncFetchInput } from "../../../../../stores/input.store";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

export function SeedProductItem({ index, onHandleRemove, onHandleUpdate }: { index: number, onHandleRemove: any, onHandleUpdate: any }) {
    const [selectedProduct, setSelectedProduct] = useState<any>();
    const [quantity, setQuantity] = useState(0);
    const [userHasProduct, setUserHasProduct] = useState(false);
    const [productList, setProductList] = useState<any[]>([]);
    const { input } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        onHandleUpdate(index, { id: selectedProduct?.id, quantity })
    }, [selectedProduct, quantity]);

    const autoComplete = (event: AutoCompleteCompleteEvent) => {
        const query = event.query.toLowerCase();
        const resultSet = productList.filter((p: any) => p?.product.name?.toLowerCase().includes(query));
        setProductList(resultSet);
    }

    useEffect(() => {
        setProductList(input.inputs);
    }, [input]);

    useEffect(() => {
        dispatch(asyncFetchInput());
    }, [])

    return <div style={{ marginTop: '5%' }}>
        <Row>
            <Col md={6}>
                <span className="p-float-label">
                    <AutoComplete field="product.name" value={selectedProduct} suggestions={productList} completeMethod={autoComplete} onChange={(e: any) => {
                        const userProducts = input.inputs.filter(i => i.product?.name === e.value.label);
                        if (userProducts.length > 0) {
                            setUserHasProduct(true);
                        }
                        if (e.value instanceof Object) {
                            setSelectedProduct(e.value);
                        }
                    }} dropdown style={{ width: '100%' }} forceSelection />
                    <label htmlFor="endDate">Produto</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Produto</Form.Label>
                    <Typeahead
                    id="product_input"
                        onChange={(selected: any) => {
                            const userProducts = input.inputs.filter(i => i.product?.name === selected[0].label)
                            if (userProducts.length > 0) {
                                setUserHasProduct(true);
                            }

                            if (selected.length > 0) {
                                setSelectedProduct({ id: selected[0].id });
                            }
                        }}
                        options={input.inputs.filter(i => i.product?.class !== 'SEMENTE').map((input) => { return { id: input.id, label: `${input?.product?.name}` } })}
                    />
                </Form.Group> */}
            </Col>
            <Col md={5}>
                <span className="p-float-label">
                    <InputNumber value={quantity} onChange={(e) => {
                        setQuantity(e.value!);
                    }} inputStyle={{ width: '100%' }} style={{ width: '100%' }}></InputNumber>
                    <label htmlFor="endDate">Quantidade de Produto</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Quantidade de produto</Form.Label>
                    <Form.Control type="number" onChange={(e) => {
                        setQuantity(Number(e.target.value));
                    }} />
                </Form.Group> */}
            </Col>
            <Col>
                <Button variant="danger" style={{ marginTop: '9%' }} onClick={() => onHandleRemove(index)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
            </Col>
        </Row>
    </div>
}