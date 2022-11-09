import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import pt from "date-fns/locale/pt-BR";

export function IncomeContracts(){
    const [contractName,setContractName] = useState('');
    const [contractId,setContractId] = useState(0);
    const [totalBags,setTotalBags]=useState(0);
    const [contractValue,setContractValue] = useState(0);
    const [startDate,setStartDate] = useState(new Date());
    const [payDate,setPayDate] = useState(new Date());
    const [description,setDescription] = useState('');

    useEffect(()=>{
        console.log(description)
    },[contractName,contractId,totalBags,contractValue,startDate,payDate,description]);



    return <div>
        <Row style={{marginTop: '2%'}}>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Nome</Form.Label>
                    <Form.Control type="text" onChange={(e)=>{ return setContractName(e.target.value);}}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Código</Form.Label>
                    <Form.Control type="number" onChange={(e)=>{ return setContractId(Number(e.target.value));}}/>
                </Form.Group>
            </Col>
            <Row style={{marginTop: '2%'}}>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Cultivo</Form.Label>
                        <Form.Select aria-label="">
                        <option value={1}>Milho</option>
                        <option value={2}>Soja</option>
                        <option value={2}>Feijão</option>
                        <option value={2}>Trigo</option>
                        <option value={2}>Cana-de-Açucar</option>
                        <option value={2}>Café</option>
                        <option value={2}>Algodão</option>
                        <option value={2}>Arroz</option>
                        <option value={2}>Mix Cobertura</option>
                        <option value={2}>Girassol</option>
                        <option value={2}>Galinha</option>
                        <option value={2}>Nome do cultivo</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row style={{marginTop: '2%'}}>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Sacas totais</Form.Label>
                        <Form.Control type="number" onChange={(e)=>{ return setTotalBags(Number(e.target.value));}}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Sacas totais</Form.Label>
                        <Form.Control type="number" onChange={(e)=>{ return setContractValue(Number(e.target.value));}}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row style={{marginTop: '2%'}}>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Inicio do contrato</Form.Label>
                        <DatePicker locale={pt} dateFormat='dd/MM/yyyy' selected={startDate} onChange={(date:Date)=> setStartDate(date)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Data de pagamento</Form.Label>
                        <DatePicker locale={pt} dateFormat='dd/MM/yyyy' selected={payDate} onChange={(date:Date)=> setPayDate(date)} />
                    </Form.Group>
                </Col>
            </Row>
            <Row style={{marginTop: '2%'}}>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Descrição adicional</Form.Label>
                        <Form.Control type="text" onChange={(e)=>{ return setDescription(e.target.value);}}/>
                    </Form.Group>
                </Col>
            </Row>
        </Row>
    </div>
}