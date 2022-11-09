import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

export function IncomeOthers(){

    const [reference,setReference] = useState('');
    const [totalValue,setTotalValue] = useState(0);

    useEffect(()=>{
        console.log(reference)
    },[reference, totalValue]);
    
    return <div>
        <Row style={{marginTop: '2%'}}>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Referência</Form.Label>
                    <Form.Control type="text" onChange={(e)=>{ return setReference(e.target.value);}}/>
                </Form.Group>
            </Col> 
        </Row>
        <Row style={{marginTop: '2%'}}>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Valor Total</Form.Label>
                    <Form.Control type="number" onChange={(e)=>{ return setTotalValue(Number(e.target.value));}}/>
                </Form.Group>
            </Col>
        </Row>
        <Row style={{marginTop: '2%'}}>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Valor Total</Form.Label>
                    <Form.Control type="number" onChange={(e)=>{ return setTotalValue(Number(e.target.value));}}/>
                </Form.Group>
            </Col>
        </Row>
    </div>
}