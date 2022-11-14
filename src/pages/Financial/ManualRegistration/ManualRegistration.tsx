import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Income } from "./components/Income";
import { Outcome } from "./components/Outcome";

export function ManualRegistration() {
    const [registrationType, setRegistrationType] = useState(1);
    const [expenseType, setExpenseType] = useState();
    return <div>
        <Card className="ra-card">
            <Card.Title>Cadastro Manual</Card.Title>
            <Row style={{ marginTop: '2%' }}>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Select aria-label="" onChange={(e) => {
                            return setRegistrationType(Number(e.target.value));
                        }}>
                            <option value={1}>Despesa</option>
                            <option value={2}>Receita</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    {registrationType === 1 ? <Outcome></Outcome> : <Income></Income>}
                </Col>
            </Row>
        </Card>
    </div>

}