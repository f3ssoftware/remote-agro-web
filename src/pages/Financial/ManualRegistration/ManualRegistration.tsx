import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Income } from "./components/Income";
import { Outcome } from "./components/Outcome";
import { Dropdown } from "primereact/dropdown";

export function ManualRegistration({ sefaz }: { sefaz?: any }) {
    const [registrationType, setRegistrationType] = useState(1);
    const [expenseType, setExpenseType] = useState();
    return <div>
        <Card className="ra-card">
            <Card.Title>Cadastro Manual</Card.Title>
            <Row style={{ marginTop: '2%' }}>
                <Col>
                    {/* <Form.Group className="mb-3" controlId="">
                        <Form.Select aria-label="" onChange={(e) => {
                            return setRegistrationType(Number(e.target.value));
                        }}>
                            <option value={1}>Despesa</option>
                            <option value={2}>Receita</option>
                        </Form.Select>
                    </Form.Group> */}
                    <span className="p-float-label">
                        <Dropdown value={registrationType} onChange={(e) => {
                            return setRegistrationType(Number(e.target.value));
                        }} options={[{ label: 'Despesa', value: 1 }, { label: 'Receita', value: 2 }]} optionLabel="label" style={{ width: '100%' }} />
                        <label htmlFor="subCost">Sub Custo</label>
                    </span>
                </Col>
            </Row>
            <Row>
                <Col>
                    {registrationType === 1 ? <Outcome sefaz={sefaz}></Outcome> : <Income></Income>}
                </Col>
            </Row>
        </Card>
    </div>

}