import { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";


export function NewCommercePlot({}){
    const [contractName,setContractName] = useState('');
    const [contractId,setContractId] = useState(0);
    const [type,setType] = useState('');


    useEffect(()=>{
        console.log(contractName)
    });

    useEffect(()=>{
        console.log(type)
    });





    return <Row style={{marginTop: '2%'}}>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Nome para o contrato</Form.Label>
                    <Form.Control type="text" onChange={(e) => {setContractName(e.target.value);}} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Codigo do contrato</Form.Label>
                    <Form.Control type="number" onChange={(e) => {setContractId(Number(e.target.value));}} />
                </Form.Group>
            </Col>
            <Row style={{marginTop: '2%'}}>
            <Col>
                <Form.Group className="mb-3" controlId=""> {/*Apenas pra visualizar, ver se vai ser typeahead*/}
                    <Form.Label style={{ color: '#fff' }}>Cultivo</Form.Label>
                    <Form.Control type="text" onChange={(e) => {setType(e.target.value);}} />
                </Form.Group>
            </Col> 
            </Row>
    </Row>
}