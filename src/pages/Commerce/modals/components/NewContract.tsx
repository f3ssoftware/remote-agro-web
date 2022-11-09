import { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

export function NewContract({}){
    const [contractName,setContractName] = useState('');
    const [contractId,setContractId] = useState(0);
    const [type,setType] = useState('');
    const [bags,setBags] = useState(0);
    const [contractPrice,setContractPrice] = useState(0);
    const [startDate,setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    const [payDate,setPayDate] = useState(new Date());

    useEffect(()=>{
        console.log(contractName)
    });
    useEffect(()=>{
        console.log(contractId)
    });

    useEffect(()=>{
        console.log(type)
    });

    useEffect(()=>{
        console.log(bags)
    });

    useEffect(()=>{
        console.log(contractPrice)
    });

    useEffect(()=>{
        console.log(startDate)
    });
    useEffect(()=>{
        console.log(endDate)
    });
    useEffect(()=>{
        console.log(payDate)
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
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Sacas Totais</Form.Label>
                    <Form.Control type="number" onChange={(e) => {setBags(Number(e.target.value));}} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Valor total do contrato</Form.Label>
                    <Form.Control type="number" onChange={(e) => {setContractPrice(Number(e.target.value));}} />
                </Form.Group>
            </Col>  
            </Row>
            <Row style={{marginTop: '2%'}}>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Inicio do contrato</Form.Label>
                        <DatePicker locale="ptBR" selected={startDate} onChange={(date:Date)=> setStartDate(date)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Fim do contrato</Form.Label>
                        <DatePicker locale="ptBR" selected={endDate} onChange={(date:Date)=> setEndDate(date)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Data de pagamento</Form.Label>
                        <DatePicker locale="ptBR" selected={payDate} onChange={(date:Date)=> setPayDate(date)} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="">  
                        <Form.Label style={{ color: '#fff' }}>Descrição adicional</Form.Label>
                        <Form.Control type="text" onChange={(e) => {setType(e.target.value);}} />
                    </Form.Group>
                </Col>
            </Row>
    </Row>
}