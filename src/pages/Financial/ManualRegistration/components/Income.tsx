import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { IncomeContracts } from "./IncomeContracts";
import { IncomeOthers } from "./IncomeOther";

export function Income(){
    const [incomeType,setIncomeType] = useState(0);
    return <div>
        <Row style={{marginTop: '2%'}}>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Tipo de Receita</Form.Label>
                    <Form.Select aria-label="" onChange={(e) => {
                        return setIncomeType(Number(e.target.value));
                    }}>
                    <option value={0}>Outras receitas</option>
                    <option value={1}>Contratos</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
            { incomeType === 1 ? <IncomeContracts></IncomeContracts> : <IncomeOthers></IncomeOthers>}
            </Col>
        </Row>
    </div>
}