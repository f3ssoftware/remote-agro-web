import { pt } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import { Invoice } from "../../../../models/Invoice";
import { UserProduct } from "../../../../models/UserProduct";
import { asyncAddUserProductToStorage, asyncFetchInvoices } from "../../../../stores/input.store";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Part } from "../../../../models/Part";


export function NewOutputParts({ index, onHandleRemove, onHandleUpdate }: { index: number, onHandleRemove: any, onHandleUpdate: any }) {
    const { maintenance } = useSelector((state: RootState) => state);
    const [productId, setProductId] = useState({id:0});
    const [goodId, setGoodId] = useState({id:0});
    const [initialQuantity, setInitialQuantity] = useState(0);
    const [initialCost, setInitialCost] = useState(0);
    const [observation, setObservation] = useState("");
    const [accountable, setAccountable] = useState("");

    useEffect(() => {
        const p: Part = {
            id: productId.id,
            part_id: productId.id.toString(),
            unit_price: initialCost,
            quantity: initialQuantity,
            accountable: accountable,
            observations: observation,

        };
        console.log('p do lado do component:', p);
        onHandleUpdate(p, index);
    }, [productId, initialQuantity, initialCost, observation, accountable]);
    return <Row style={{ marginTop: '2%' }}>
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Peça</Form.Label>
                <Typeahead
                id="part"
                    onChange={(selected: any) => {
                        if (selected.length > 0) {
                            setProductId({ id: selected[0].id })
                          }
                    }}
                    options={maintenance.parts.map(input => { return { id: input.id, label: input?.name } })}
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
                <Form.Label style={{ color: '#fff' }}>Bem</Form.Label>
                <Typeahead
                id="good"
                    onChange={(selected: any) => {
                        if (selected.length > 0) {
                            setGoodId({ id: selected[0].id })
                          }
                    }}
                    options={maintenance.goods.map(input => { return { id: input.id, label: input?.name } })}
                />
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