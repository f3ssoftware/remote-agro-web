import { useEffect, useState } from "react";
import { Row, Col, Button, Form, Dropdown } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt-BR";
import { asyncFetchCultivations } from '../../../../stores/financial.store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../index'

export function NewContract({}){
    const [contractName,setContractName] = useState('');
    const [contractId,setContractId] = useState(0);
    const [type,setType] = useState('');
    const [bags,setBags] = useState(0);
    const [contractPrice,setContractPrice] = useState(0);
    const [startDate,setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    const [payDate,setPayDate] = useState(new Date());
    const [selectedCultivations, setSelectedCultivations]: any = useState({})
    const { financial } = useSelector((state: RootState) => state)
    const dispatch = useDispatch<any>()

    useEffect(()=>{
        console.log(payDate)
    },[contractName,contractId,type,bags,contractPrice,startDate,endDate,payDate]);

    useEffect(() => {
        dispatch(asyncFetchCultivations())
        setSelectedCultivations(financial?.cultivations[0])
      }, [])



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
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label style={{ color: '#fff' }}>Cultivo</Form.Label>
                <Form.Select defaultValue="Selecione">
                    {financial?.cultivations?.map((cultivations: any, index) => {
                        return (
                        <option
                            key={index}
                            onClick={() => setSelectedCultivations(financial)}
                        >
                            {cultivations.name}
                        </option>
                        )
                    })}

                </Form.Select>
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
                        <DatePicker locale={pt} dateFormat='dd/MM/yyyy' selected={startDate} onChange={(date:Date)=> setStartDate(date)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Fim do contrato</Form.Label>
                        <DatePicker locale={pt} dateFormat='dd/MM/yyyy' selected={endDate} onChange={(date:Date)=> setEndDate(date)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Data de pagamento</Form.Label>
                        <DatePicker locale={pt} dateFormat='dd/MM/yyyy' selected={payDate} onChange={(date:Date)=> setPayDate(date)} />
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