import { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";


export function NewCommercePlot({}){
    const [plotName,setPlotName] = useState('');
    const [description,setDescription] = useState('');


    useEffect(()=>{
        console.log(plotName)
    });

    useEffect(()=>{
        console.log(description)
    });





    return <Row style={{marginTop: '2%'}}>
            <Col md={12}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Nome para o silo</Form.Label>
                    <Form.Control type="text" onChange={(e) => {setPlotName(e.target.value);}} />
                </Form.Group>
            </Col>
            <Col md={12}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Descrição adicional</Form.Label>
                    <Form.Control type="text" onChange={(e) => {setDescription(e.target.value);}} />
                </Form.Group>
            </Col>
    </Row>
}