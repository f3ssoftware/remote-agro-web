import { useEffect, useState } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import { TreatSeedsDTO } from "../../../../models/dtos/TreatSeeds.dto";
import { Product } from "../../../../models/Product";
import { asyncTreatSeeds } from "../../../../stores/input.store";
import { getMessages } from "../../../../stores/messaging.store";
import { SeedProductItem } from "./components/SeedProductItem";
import { Dialog } from "primereact/dialog";
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

export function SeedsTreatment({
    show,
    handleClose,
}: {
    show: boolean;
    handleClose: any;
}) {
    const dispatch = useDispatch<any>();
    const { input } = useSelector((state: RootState) => state);
    const [seed, setSeed] = useState<any>();
    const [seedQuantity, setSeedQuantity] = useState(0);
    const [accountable, setAccountable] = useState("");
    const [observations, setObservations] = useState("");
    const [products, setProducts]: any[] = useState([{ id: 0, quantity: 0 }]);
    const [selectedProduct, setSelectedProduct] = useState<any>();
    const [productList, setProductList] = useState<any[]>([]);

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
        newProducts.push({ id: 0, quantity: 0 });
        setProducts(newProducts);
    };

    const validateForm = () => {
        let isValid = true;
        if (products.length === 0) {
            dispatch(getMessages({
                message: 'Obrigatório adicionar produto',
                type: "error",
            }))
            isValid = false
        }

        return isValid;
    }

    const register = () => {
        const request: TreatSeedsDTO = {
            user_products: products,
            accountable,
            user_seed_id: seed.id,
            observations,
            correct_decimals: true,
            user_seed_quantity: seedQuantity,
        };

        if (validateForm()) {
            dispatch(asyncTreatSeeds(request));
            handleClose();
        }

    };

    const autoComplete = (event: AutoCompleteCompleteEvent) => {
        const resultSet = productList.filter((p: any) => p?.label?.includes(event.query));
        if (resultSet.length > 0) {
            setProductList(resultSet);
        } else {
            setProductList(fetchSeeds());
        }
    }

    useEffect(() => {
        if (input.inputs) {
            setProductList(fetchSeeds())
        }
    }, [input])

    const fetchSeeds = () => {
        return input.inputs
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
            });
    }

    return <Dialog headerStyle={{ backgroundColor: '#7C5529', color: '#FFF' }} contentStyle={{ backgroundColor: '#7C5529' }} header="Tratamento de Sementes" visible={show} style={{ width: '50vw' }} onHide={() => handleClose()}>
        <Row>
            <Col>
                <span className="p-float-label">
                    <AutoComplete field="label" value={seed} suggestions={productList} completeMethod={autoComplete} onChange={(e: any) => {
                        setSeed(e.value);
                    }} dropdown style={{ width: '100%' }} forceSelection />
                    <label htmlFor="endDate">Semente</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: "#fff" }}>Semente</Form.Label>
                    <Typeahead
                        id="seed"
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
                </Form.Group> */}
            </Col>
            <Col>
                <span className="p-float-label">
                    <InputNumber value={seedQuantity} onChange={(e) => {
                        setSeedQuantity(e.value!);
                    }} inputStyle={{ width: '100%' }}></InputNumber>
                    <label htmlFor="seedQuantity">Qtd Sementes</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: "#fff" }}>
                        Quantidade de Sementes
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => {
                            setSeedQuantity(Number(e.target.value));
                        }}
                    />
                </Form.Group> */}
            </Col>
        </Row>
        <Row>
            <Col>
                <span className="p-float-label">
                    <InputText value={accountable} onChange={(e) => {
                        setAccountable(e.target.value);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="product">Responsável</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: "#fff" }}>Responsável</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => {
                            setAccountable(e.target.value);
                        }}
                    />
                </Form.Group> */}
            </Col>
            <Col>
                <span className="p-float-label">
                    <InputText value={observations} onChange={(e) => {
                        setObservations(e.target.value);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="product">Observações</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: "#fff" }}>Observações</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => {
                            setObservations(e.target.value);
                        }}
                    />
                </Form.Group> */}
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
    </Dialog>
}
