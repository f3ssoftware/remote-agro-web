import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

export function CreateBankAccount({}){
    const [accountNickname,setAccountNickname] = useState('');
    const [propName,setPropName] = useState('');
    const [bankName,setBankName] = useState('');

    useEffect(()=>{
        console.log(accountNickname)
    });
    useEffect(()=>{
        console.log(propName)
    });
    useEffect(()=>{
        console.log(bankName)
    });

    return <Row style={{marginTop: '2%'}}>
        <Col md={12}>
            <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Apelido para a conta</Form.Label>
                <Form.Control type="text" onChange={(e) => {setAccountNickname(e.target.value);}} />
            </Form.Group>
        </Col>
        <Col md={12}>
            <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Nome do Proprietário</Form.Label>
                <Form.Control type="text" onChange={(e) => {setPropName(e.target.value);}} />
            </Form.Group>
        </Col>
        <Col md={12}>
            <Form.Group className="mb-3" controlId=""> {/*Apenas pra visualizar, ver se vai ser typeahead*/}
                <Form.Label style={{ color: '#fff' }}>Selecione o banco</Form.Label>
                <Form.Control type="text" onChange={(e) => {setBankName(e.target.value);}} />
            </Form.Group>
        </Col>
    </Row>
}