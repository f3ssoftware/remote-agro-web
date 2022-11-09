import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Income } from "./components/Income";

export function ManualRegistration(){
    const [registrationType, setRegistrationType] = useState(1);
    return <div>
        <Row style={{marginTop: '2%'}}>
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
        { registrationType === 1 ? <div></div> : <Income></Income>}
        </Col>
    </Row>
    </div>
    
}