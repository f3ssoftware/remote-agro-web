import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useSelector } from "react-redux";
import { RootState } from "../../../../..";
import { Product } from "../../../../../models/Product";

export function SeedProductItem({ index, onHandleRemove, onHandleUpdate }: { index: number, onHandleRemove: any, onHandleUpdate: any }) {
    const [selectedProduct, setSelectedProduct] = useState({ id: 0 });
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        onHandleUpdate(index, { id: selectedProduct.id, quantity })
    }, [selectedProduct, quantity]);
    const { input } = useSelector((state: RootState) => state);
    return <div>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Produto</Form.Label>
                    <Typeahead
                    id="product_input"
                        onChange={(selected: any) => {
                            if (selected.length > 0) {
                                setSelectedProduct({ id: selected[0].id });
                            }
                        }}
                        options={input.inputs.filter(i => i.product?.class !== 'SEMENTE').map((input) => { return { id: input.id, label: `${input?.product?.name}` } })}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Quantidade de produto</Form.Label>
                    <Form.Control type="number" onChange={(e) => {
                        setQuantity(Number(e.target.value));
                    }} />
                </Form.Group>
            </Col>
            <Col>
                <Button variant="danger" style={{ marginTop: '9%' }} onClick={() => onHandleRemove(index)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
            </Col>
        </Row>
    </div>
}