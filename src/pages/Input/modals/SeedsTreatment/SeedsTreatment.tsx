import { useState } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import { TreatSeedsDTO } from "../../../../models/dtos/TreatSeeds.dto";
import { Product } from "../../../../models/Product";
import { asyncTreatSeeds } from "../../../../stores/input.store";
import { SeedProductItem } from "./components/SeedProductItem";

export function SeedsTreatment({
    show,
    handleClose,
}: {
    show: boolean;
    handleClose: any;
}) {
    const dispatch = useDispatch<any>();
    const { input } = useSelector((state: RootState) => state);
    const [seed, setSeed] = useState({ id: 0 });
    const [seedQuantity, setSeedQuantity] = useState(0);
    const [accountable, setAccountable] = useState("");
    const [observations, setObservations] = useState("");
    const [products, setProducts]: any[] = useState([]);

    const onHandleRemove = (index: number) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    };

    const onHandleUpdate = (index: number, product: any) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        newProducts.push(product);
        setProducts(newProducts);
    };

    const addLine = () => {
        const newProducts = [...products];
        newProducts.push({ product_id: 0, quantity: 0 });
        setProducts(newProducts);
    };

    const register = () => {
        const request: TreatSeedsDTO = {
            user_products: products.map((p: any) => p.id),
            accountable,
            user_seed_id: seed.id,
            observations,
            correct_decimals: true,
            user_seed_quantity: seedQuantity,
        };
        dispatch(asyncTreatSeeds(request));
    };
    return (
        <Modal show={show} onHide={handleClose} size={"xl"}>
            <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
                <Modal.Title>
                    {" "}
                    <span style={{ color: "#fff" }}>Tratamento de Sementes</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#7C5529" }}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label style={{ color: "#fff" }}>Semente</Form.Label>
                            <Typeahead
                                onChange={(selected: any) => {
                                    if (selected.length > 0) {
                                        setSeed({ id: selected[0].id });
                                    }
                                }}
                                options={input.inputs
                                    .filter((product: Product) => {
                                        return (
                                            product.product?.class === "SEMENTE" &&
                                            product.treatment !== "EXTERNO"
                                        );
                                    })
                                    .map((input) => {
                                        return {
                                            id: input.id,
                                            label: `${input?.product?.name} - ${input.treatment}`,
                                        };
                                    })}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label style={{ color: "#fff" }}>
                                Quantidade de Sementes
                            </Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setSeedQuantity(Number(e.target.value));
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label style={{ color: "#fff" }}>Responsável</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setAccountable(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label style={{ color: "#fff" }}>Observações</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setObservations(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {products?.map((p: Product, index: number) => {
                    return (
                        <SeedProductItem
                            index={index}
                            key={index}
                            onHandleRemove={onHandleRemove}
                            onHandleUpdate={onHandleUpdate}
                        ></SeedProductItem>
                    );
                })}
                <Row>
                    <Col>
                        <Button variant="primary" onClick={() => addLine()}>
                            Adicionar Linha
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="success" onClick={() => register()}>
                            Registrar
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}
